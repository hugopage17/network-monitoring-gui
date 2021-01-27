import socketIOClient from 'socket.io-client'
import {inputStyle, butStyle, style} from '../../../styleComponents'
import {useState, useEffect} from 'react'
import NodesToAdd from './NodesToAdd'
import {apiCall} from '../../../functions'
import {setNetwork} from '../../../redux/actions'

function AddSubnet(id, index, complete){
  const socket = socketIOClient('http://localhost:5000')
  const [toggle, setToggle] = useState(true)
  const [nodes, addNode] = useState([])
  const [subnet, setNet] = useState('')

  useEffect(()=>{
    socket.on('scan-subnet', (data)=>{
      addNode(nodes => [...nodes, data])
    })
    socket.on('end-subnet', (data)=>{setToggle(toggle => !toggle)})
  })

  const start = () => {
    socket.emit('scan-subnet', subnet)
  }

  const end = () => {
    complete().then((res)=>{
      setToggle(toggle => !toggle)
    })
  }


  return(
    <div>
      {toggle ? (
        <div style={style}>
          <input type='text' class='input-1' placeholder='Subnet (e.g 192.168.1.0/24)' style={inputStyle} onChange={(e)=>{
            let val = e.target.value
            setNet(subnet => val)
          }}/><br/>
          <button class='but-1'  style={butStyle} onClick={start}>Submit</button>
        </div>
      ):(<NodesToAdd nodes={nodes} id={id} network={index} close={end}/>)}
    </div>
  )
}

export default AddSubnet
