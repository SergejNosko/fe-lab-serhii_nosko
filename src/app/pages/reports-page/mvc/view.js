import {Controller} from './controller';
import Template from '../template/template.hbs';
import Highcharts from 'highcharts';

export class View {
  constructor(data) {
    this.controller = new Controller(data);
  }

  drawChart(data){

  }

  render() {
    const root = document.getElementById('root');

    root.innerHTML = Template();

    const data = this.controller.receiveData();

    Highcharts.chart('report', {
      title: '',
      chart: {
        type: 'column',
        backgroundColor: '#2A3F50',
        width: 570,
        height: 350
      },
      xAxis: {
        type: 'category',
        categories: ['URGENT', 'HIGH', 'MIDDLE', 'LOW', 'FAILED'],
        lineColor: '#fff',
        tickWidth: 0,
        labels: {
          style: {
            color: '#fff',
            fontFamily: 'PT Sans, sans-serif',
            fontSize: '13px'
          }
        },
      },
      yAxis: {
        title: '',
        gridLineColor: '#345168',
        lineColor: '#fff',
        lineWidth: 1,
        labels: {
          style: {
            color: '#fff',
            fontFamily: 'PT Sans, sans-serif',
            fontSize: '13px'
          }
        }
      },
      legend: {
        symbolRadius: 0,
        symbolHeight: 8,
        symbolWidth: 8,
        margin: 50,
        style: {
          display: 'flex',
          alignItems: 'center'
        },
        itemStyle: {
          color: '#8da5b8',
          fontWeight: 'normal',
          fontSize: 12
        },
        itemHoverStyle: {
          color: '#82c7e0'
        }
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          pointWidth: 40,
          groupPadding: 0.5,
          dataLabels: {
            enabled: false,
            format: '{point.y}'
          }
        }
      },

      tooltip: {
        backgroundColor: '#dbeaf5',
        borderColor: '#dbeaf5',
        formatter: function () {
          return `<span class="report__tooltip-title">${this.series.name}</span><br><span class="report__tooltip-span">Tasks</span>: ${this.series.data[0].y}<br/>`
        }
      },

      series: [{
        name: 'URGENT',
        data: [{
          name: 'URGENT',
          y: 1,
          x: 0
        },
          {
            name: 'URGENT',
            y: 4,
            x: 0
          },
          {
            name: 'URGENT',
            y: 6,
            x: 0
          }],
        color: '#F75C4C',
        zones: [{
          value: 4,
          color: 'blue'
        }]
      }, {
        name: 'HIGH',
        data: [{
          name: 'HIGH',
          y: data[1]
        }],
        color: '#FFA841'
      }, {
        name: 'MIDDLE',
        data: [{
          name: 'MIDDLE',
          y: data[2]
        }],
        color: '#FDDC43'
      }, {
        name: 'LOW',
        data: [{
          name: 'LOW',
          y: data[3]
        }],
        color: '#1ABC9C'
      }, {
        name: 'FAILED',
        data: [{
          name: 'FAILED',
          y: data[4]
        }],
        color: '#8da5b8'
      }]
    });
  }
}
