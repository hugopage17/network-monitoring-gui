import React, {Component} from 'react'
import {map} from 'underscore'
import '../../../stylesheets/add.css'
import {butStyle} from '../../../styleComponents'
import {apiCall} from '../../../functions'
import {useSelector, useDispatch} from 'react-redux'
import {setNetwork} from '../../../redux/actions'

class NodesToAdd extends Component{
  constructor(props){
    super(props)
  }

  addNodes = async() => {
    const nodes = this.props.nodes
    var body = {
      nodes:nodes,
      network:this.props.network
    }
    const upload = await apiCall('multiadd', 'POST', body, this.props.id)
    this.props.close()
  }

  render(){
    const nodes = this.props.nodes
    return(
      <div class='nodes-to-add'>
        <div class='all-nodes-found'>
          {map(nodes, n => {
            const index = nodes.indexOf(n)+1
            return(
              <div class='each-found-node'>
                <div>
                  <label>Node {index}</label>
                </div>
                <input type='text' value={n.host} class='input-1'/><br/>
                <input type='text' placeholder='Name' class='input-1' onChange={(e)=>{
                  const val = e.target.value
                  n.name = val
                }}/><br/>
                <input type='text' placeholder='Latitude' class='input-1' onChange={(e)=>{
                  const val = e.target.value
                  n.lat = val
                }}/><br/>
                <input type='text' placeholder='Longtitude' class='input-1' onChange={(e)=>{
                  const val = e.target.value
                  n.long = val
                }}/><br/>
              </div>
            )
          })}
          <button class='but-1' style={{...butStyle, width:'93%'}} onClick={this.addNodes}>Submit</button>
        </div>
      </div>
    )
  }
}

export default NodesToAdd
