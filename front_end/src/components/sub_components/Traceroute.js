import React,{Component} from 'react'
import {map} from 'underscore'
import socketIOClient from 'socket.io-client'

class Traceroute extends Component{
  constructor(props){
    super(props)
    this.state = {
      traceroute:[]
    }
  }

  componentDidMount(){
    const socket = socketIOClient('http://localhost:5000')
    socket.emit('trace', this.props.dest)
    socket.on('trace', (data)=>{
      var traceroute = this.state.traceroute
      traceroute.push(data)
      this.setState({traceroute})
    })
  }

  render(){
    const route = this.state.traceroute
    return(
      <div>
        {map(route, hop => {
          return(
            <div class='each-hop'>
              <label>{hop.hop}</label>
              <label>{hop.rtt1}</label>
              <label>{hop.rtt2}</label>
              <label>{hop.rtt3}</label>
              <label>{hop.ip}</label>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Traceroute
