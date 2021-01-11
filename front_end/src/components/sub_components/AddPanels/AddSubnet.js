import socketIOClient from 'socket.io-client'
import {inputStyle, butStyle, style} from '../../../styleComponents'
import {useState, useEffect} from 'react'
import NodesToAdd from './NodesToAdd'
import {useSelector, useDispatch} from 'react-redux'
import {apiCall} from '../../../functions'
import {setNetwork} from '../../../redux/actions'

function AddSubnet(id, index, complete){
  const socket = socketIOClient('http://localhost:5000')
  const [toggle, setToggle] = useState(true)
  const [nodes, addNode] = useState([])

  useEffect(()=>{
    socket.on('scan-subnet', (data)=>{
      addNode(nodes => [...nodes, data])
    })
    socket.on('end-subnet', (data)=>{setToggle(toggle => !toggle)})
  })

  const start = () => {
    socket.emit('scan-subnet', '10.167.4.41/29')
  }


  return(
    <div>
      {toggle ? (
        <div style={style}>
          <input type='text' class='input-1' placeholder='Subnet (e.g 192.168.1.0/24)' style={inputStyle}/><br/>
          <button class='but-1'  style={butStyle} onClick={start}>Submit</button>
        </div>
      ):(<NodesToAdd nodes={nodes} id={id} network={index} close={complete}/>)}
    </div>
  )
}

export default AddSubnet
