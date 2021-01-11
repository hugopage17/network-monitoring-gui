import React,{Component} from 'react'
import {map} from 'underscore'
import '../../stylesheets/nodeview.css'
import {responseTime} from '../../functions'

class PingHistory extends Component{

  render(){
    const data = this.props.data
    return(
      <div class='full-ping-wrapper' >
        {map(data, d => {
          let state = 'no'
          if(d.packet_loss >= 25 && d.packet_loss < 50){
            state = 'minor'
          }else if(d.packet_loss >= 50){
            state = 'high'
          }
          return(
            <div class={`each-ping ${state}-loss`}>
              <label>Address: {d.ip_address}</label>
              <label>Response Time: {responseTime(d.res_avg)}</label>
              <label>Packet Loss: {d.packet_loss}%</label>
            </div>
          )
        })}
      </div>
    )
  }
}

export default PingHistory
