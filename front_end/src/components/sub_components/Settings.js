import React,{Component} from 'react'
import {butStyle} from '../../styleComponents'

class Settings extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    const data = this.props.data
    return(
      <div id='full-bg-wrapper'>
        <div class='float-panel settings-panel'>
          <button class='but-1' style={{margin:'20px',fontSize:18}} onClick={this.props.close}>x</button><br/>
          <label>Name</label><br/>
          <input type='text' class='input-1' value={data.name}/><br/>
          <label>Polling Address</label><br/>
          <input type='text' class='input-1' value={data.address}/><br/>
          <label>Latitude</label><br/>
          <input type='text' class='input-1' value={data.lat}/><br/>
          <label>Longtitude</label><br/>
          <input type='text' class='input-1' value={data.long}/><br/>
          <button class='but-1' style={butStyle}>Submit</button>
        </div>
      </div>
    )
  }
}

export default Settings
