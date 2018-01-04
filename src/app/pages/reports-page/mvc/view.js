import {Controller} from './controller';
import Template from '../template/template.hbs';
import Highcharts from 'highcharts';

export class View {
  constructor(data){
    this.controller = new Controller(data);
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
        width: 570
      },
      xAxis: {
        type: 'category',
        lineColor: '#fff',
        tickWidth: 0,
        labels: {
          style: {
            color: '#fff',
            fontFamily: 'PT Sans, sans-serif',
            fontSize: '13px'
          }
        }
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
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: false,
            format: '{point.y}'
          }
        }
      },

      tooltip: {
        backgroundColor: '#dbeaf5',
        borderColor: '#dbeaf5',
        headerFormat: '<span class="report__tooltip-title">{point.name}</span><br>',
        pointFormat: '<span class="report__tooltip-span">Tasks</span>: <b>{point.y}</b><br/>'
      },

      series: [{
        name: 'Brands',
        data: [{
          name: 'URGENT',
          y: data[0],
          color: '#F75C4C'
        }, {
          name: 'HIGH',
          y: data[1],
          color: '#FFA841'
        }, {
          name: 'MIDDLE',
          y: data[2],
          color: '#FDDC43'
        }, {
          name: 'LOW',
          y: data[3],
          color: '#1ABC9C'
        }, {
          name: 'FAILED',
          y: data[4],
          color: '#8da5b8'
        }]
      }]
    });
  }
}
