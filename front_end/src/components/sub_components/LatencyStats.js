import React,{Component} from 'react'
import {getAvg} from '../../functions'

class LatencyStats extends Component{
  constructor(props){
    super(props)
    this.state = {
      min:0,
      max:0,
      avg:0,
    }
  }


  render(){
    const stats = this.props.ping
    const times = this.props.times
    if(stats.res_avg){
      let value = Number(stats.res_avg.split('.')[0])
      if(value < this.state.min || this.state.min === 0){
        this.setState({min:value})
      }
      if(value > this.state.max || this.state.max === 0){
        this.setState({max:value})
      }
    }
    const avg = getAvg(times)
    return(
      <span id='ping-stats-wrapper'>
        <label>Minimum: {this.state.min}ms</label>
        <label>Maximum: {this.state.max}ms</label>
        <label>Average: {avg}ms</label>
      </span>
    )
  }

}

export default LatencyStats
