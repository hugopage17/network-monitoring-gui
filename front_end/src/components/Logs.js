import React,{Component} from 'react'
import {map} from 'underscore'


class Logs extends Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }

  getColor = (status) => {
    switch(status) {
      case 'online':
        return 'rgba(0,255,0)'
        break;
      case 'offline':
        return 'rgba(255,0,0)'
        break;
      default:
        return
    }
  }

  render(){
    const logs = this.props.data
    return(
      <div id='logs-wrapper'>
        {map(logs, log => {
          const color = this.getColor(log.status)
          return(
            <div id='each-log'>

              <label style={{color:color}}>{log.name}</label>
              <label style={{color:color}}>{log.msg}</label>
            </div>
          )
        })}
      </div>
    )
  }

}

export default Logs
