import {apiCall, getRange} from '../../../functions'
import {useState, useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import {inputStyle, butStyle, style} from '../../../styleComponents'
import NodesToAdd from './NodesToAdd'

function IPScan(id, index, complete){

  const [range, setRange] = useState('192.168.1.194-198')
  const [width, setWidth] = useState(0)
  const [loadbar, hidebar] = useState(true)
  const socket = socketIOClient('http://localhost:5000')
  const [node, addNode] = useState([])
  const [i, addI] = useState(0)
  const [total, setTotal] = useState(0)
  const [switchPanel, toggle] = useState(true)


  useEffect(()=>{
    socket.on('start-scan', (data)=>{
      addI(i => i+=1)
      if(data.status === 'online'){
        addNode(node => [...node, data])
      }
      let p = 1/getRange(range)
      setTotal(total => getRange(range))
      p = p*100
      setWidth(width => width+=p)
    })
    socket.on('end-scan', (data)=>{toggle(switchPanel => !switchPanel)})
  })

  const scan = () => {
    hidebar(loadbar => false)
    socket.emit('start-scan', range)
  }

  const end = () => {
    complete().then((res)=>{
      toggle(switchPanel => !switchPanel)
    })
  }


  return(
    <div>
      {switchPanel ? (
        <div style={style}>
          <div style={{paddingBottom:15}}>
            <input type='text' class='input-1' placeholder='IP Range (e.g 192.168.1.0-254)' style={inputStyle} onChange={(e)=>{
              const n = e.target.value
              setRange(range => n)
            }}/><br/>
            <button class='but-1' style={butStyle} onClick={scan}>Submit</button>
          </div>
          <div id="myProgress" hidden={loadbar}>
            <label style={{float:'left',margin:5}}>Scanning {i}/{total}</label>
            <div id="myBar" style={{width:`${width}%`}}></div>
          </div>
        </div>
      ):(<NodesToAdd nodes={node} id={id} network={index} close={end}/>)}
    </div>
  )
}

export default IPScan
