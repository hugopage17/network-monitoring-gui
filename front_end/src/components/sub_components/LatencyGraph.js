import React,{Component} from 'react'
import { Line } from 'react-chartjs-2'

class LatencyGraph extends Component{


  render(){
    return(
      <div id='ping-graph-container'>
        <Line data={
          {
            labels:this.props.labels,
            datasets:[
              {
                label:'Latency ms',
                data:this.props.times,
                yAxisID: 'latency',
                fill:true,
                borderColor:'rgba(92, 214, 255, 1)',
                backgroundColor:'rgba(92, 214, 255, 0.25)',
                borderWidth:1
              },
              {
                label:'Packet Loss (%)',
                data:this.props.loss,
                yAxisID: 'loss',
                fill:false,
                borderColor:'rgba(222, 0, 0, 1)',
                borderWidth:2
              }
            ]
          }
        } height={90} options={
          {
            maintainAspectRatio: true,animation: false, responsive:true,
            scales: {
              xAxes: [{
                gridLines: {
                  color: 'rgba(32, 32, 32, 0.3)',
                  lineWidth: 1
                }
              }],
              yAxes: [{
                id:'latency',
                position:'left',
                gridLines: {
                  color: 'rgba(32, 32, 32, 0.3)',
                  lineWidth: 1
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Response (ms)'
                }
              },
              {
                id:'loss',
                position:'right',
                ticks: {
                  stepSize: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  color: 'rgba(32, 32, 32, 0.3)',
                  lineWidth: 1
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Packet Loss (%)'
                },
                ticks: {
                  beginAtZero:true,
                  min: 0,
                  max: 100
                }
              }],
            }
          }
        }/>
      </div>
    )
  }

}

export default LatencyGraph
