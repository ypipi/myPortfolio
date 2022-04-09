const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
dotenv.config();
var app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));



var HTTP_PORT = process.env.PORT || 8080;

var distDir = __dirname + "/dist/yk-app";
app.use(express.static(distDir));

app.get("/api/status", function (req, res) {
  res.status(200).json({ status: "UP" });
});

app.get('/*', function(req,res) {
  res.sendFile(path.join(distDir+'/index.html'));});

app.post("/api/sendmail", (req, res) => {
  let info = req.body;
  console.log(info);
  sendMail(info).then(d=> res.send(info))
  .catch((error)=> cres.send({ error: "Failed to send email : " + error }));
});

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(info) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAILFROM,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: process.env.EMAILFROM,
      to: process.env.EMAILTO,
      subject: info.subject + " from " + info.email,
      html: "<h1>" + info.subject + "</h1><br/><br/>" +
            "Name : " + info.name + "<br/>" +
            "Email: " + info.email + "<br/>" +
            "Message : " + "<br/><br/>" + info.message,
    };
    const result = await transport.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
}

app.listen(HTTP_PORT, () => {
  console.log("Ready to handle requests on port " + HTTP_PORT);
});
