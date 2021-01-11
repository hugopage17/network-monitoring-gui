import {apiCall, getRange} from '../../../functions'
import {useState, useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import {inputStyle, butStyle, style} from '../../../styleComponents'
import NodesToAdd from './NodesToAdd'
import {useSelector, useDispatch} from 'react-redux'
import {setNetwork} from '../../../redux/actions'

function IPScan(close){

  const [range, setRange] = useState('192.168.1.194-198')
  const [width, setWidth] = useState(0)
  const [loadbar, hidebar] = useState(true)
  const socket = socketIOClient('http://localhost:5000')
  const [node, addNode] = useState([])
  const [i, addI] = useState(0)
  const [total, setTotal] = useState(0)
  const [switchPanel, toggle] = useState(true)
  const user = useSelector((state) => state.user)
  const network = useSelector((state) => state.currentNetwork)
  const networks = useSelector((state) => state.appData.networks)

  const dispatch = useDispatch()
  const selectNetwork = (network) => dispatch(setNetwork(network))

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

  const complete = () => {
    const index = networks.indexOf(network)
    apiCall(`reload?index=${index}`, 'GET' , {}, user.uid).then((res)=>{
      selectNetwork(res.response)
      toggle(switchPanel => !switchPanel)
      close()
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
      ):(<NodesToAdd nodes={node} id={user.uid} network={networks.indexOf(network)} close={complete}/>)}
    </div>
  )
}

export default IPScan
