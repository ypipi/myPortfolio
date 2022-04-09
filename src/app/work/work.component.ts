import { AppComponent } from './../app.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faDatabase, faDesktop, faServer, faChartPie } from '@fortawesome/free-solid-svg-icons';
import * as d3 from 'd3';

export interface chartData {
  name: string;
  value: number;
}
@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit {
  // @ViewChild('.chart', { static: true })
  // chartContainer: ElementRef<HTMLInputElement> = {} as ElementRef;
  public data: chartData[] = [
    { name: 'SQL', value: 90 },
    { name: 'VB.Net', value: 80 },
    { name: 'C#.Net', value: 80 },
    { name: 'd3.js', value: 63 },
    { name: 'Node.js', value: 60 },
    { name: 'Angular', value: 92 },
    { name: 'jQuery', value: 80 },
    { name: 'JavaScript', value: 95 },
    { name: 'HTML/CSS', value: 99 },
  ];
  faDatabase =faDatabase;
  faDesktop = faDesktop;
  faServer =faServer;
  faChartPie=faChartPie;
  constructor() {}

  ngAfterViewInit() {}
  ngOnInit(): void {
    this.createBarChart2();
  }

  private createBarChart2() {
    const margin = { top: 50, right: 10, bottom: 50, left: 90 };
    const offsetWidth = 810;
    const offsetHeight = 820;
    const color1 = [
      '#56C7CF',
      '#635FD4',
      '#E29D40',
      '#D35A9F',
      '#A19FF5',
      '#7DE08C',
      '#56C7CF',
      '#f44c35',
      '#b9ec0b',
    ];
    const color2 = [
      '#828282',
      '#8c8c8c',
      '#959595',
      '#9f9f9f',
      '#a9a9a9',
      '#b3b3b3',
      '#bdbdbd',
      '#c7c7c7',
      '#d0d0d0',
    ];

    const color = [
      '#0becdd',
      '#0becdd',
      '#0becdd',
      '#0becdd',
      '#0becdd',
      '#0becdd',
      '#0becdd',
      '#0becdd',
      '#0becdd',
    ];


    const tickLabels = [ 'Intermediate', 'Advanced', 'Expert'];
    d3.select('.chart').remove();

    const svg = d3
      .select('svg')
      .attr('preserveAspectRatio', 'none')
      .attr('viewBox', '-70 -30 1010 850')
      .attr('width', '100%')
      .attr('height', '450px')
      .attr('class', 'bChart');



    const contentWidth = offsetWidth - margin.left - margin.right;
    const contentHeight = offsetHeight - margin.top - margin.bottom;

    const ratio = contentWidth / 100;

    // Initialize the Y axis
    var y = d3
      .scaleBand()
      .range([0, -contentHeight])
      .domain(this.data.map((d) => d.name))
      .padding(0.2);
    var yAxis = svg
      .append('g')
      .style('font-size', '30px')
      .style('color', '#ffffff')
      .attr('transform', 'translate(90,' + contentHeight + ')')
      .call(
        d3
          .axisLeft(y)
          .tickFormat((i) => i)
          .tickSize(10)
         
      )
      .call((g) => g.select('.domain').remove())
      .transition()
      .duration(1000);

    // Initialize the X axis
    let x = d3.scaleLinear().domain([0, 100]).range([0, contentWidth]);
    let xAxis = svg
      .append('g')
      .style('font-size', '30px')
      .style('color', '#ffffff')
      .attr('transform', 'translate(90,0)')
      .attr('stroke-opacity', 0.5)

      .call(
        d3
          .axisTop(x)
          .tickSize(-contentHeight)
          .tickValues([30, 65, 100])
          .tickFormat(function (d, i) {
            return tickLabels[i];
          })
      )
      .call((g) => g.select('.domain').remove());

    let u = svg
      .selectAll('rect')
      .data(this.data.reverse())
      .enter()
      .append('rect')
      .attr('transform', 'translate(90,0)')
      .attr('x', '0')
      .attr('height', y.bandwidth() / 1.3)
      .attr('y', (d) => (y(d.name) as number) + contentHeight +10)
      .attr('width', 0)
      .attr('fill', (d, i) => color[i])
      .style('ry', '5px');

    u.transition()
      .duration(1000)
      .delay((d, i) => i * 250)
      .attr('width', (d) => x(d.value));
  }
}
