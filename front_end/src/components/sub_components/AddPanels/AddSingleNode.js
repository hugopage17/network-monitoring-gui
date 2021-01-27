import {apiCall} from '../../../functions'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setNetwork} from '../../../redux/actions'
import {inputStyle, butStyle, style} from '../../../styleComponents'

function AddSingleNode(close){

  const [name, setName] = useState('Test')
  const [ip, setIP] = useState('192.168.1.254')
  const [lat, setlat] = useState(0)
  const [long, setlong] = useState(0)
  const user = useSelector((state) => state.user)
  const network = useSelector((state) => state.currentNetwork)
  const networks = useSelector((state) => state.appData.networks)

  const dispatch = useDispatch()
  const selectNetwork = (network) => dispatch(setNetwork(network))

  const add = () => {
    let index = networks.indexOf(network)
    const body = {
      name:name,
      address:ip,
      lat:lat,
      long:long,
      network:index
    }
    apiCall('addnode', 'POST', body, user.uid).then((res)=>{
      const index = networks.indexOf(network)
      apiCall(`reload?index=${index}`, 'GET' , {}, user.uid).then((res)=>{
        selectNetwork(res.response)
        close()
      })
    })
  }

  return(
    <div style={style}>
      <div style={{paddingBottom:15}}>
        <input type='text' class='input-1' placeholder='Node name' style={inputStyle} onChange={(e)=>{
          const n = e.target.value
          setName(name => n)
        }}/><br/>
        <input type='text' class='input-1' placeholder='Management IP' style={inputStyle} onChange={(e)=>{
          const n = e.target.value
          setIP(ip => n)
        }}/><br/>
      </div>
      <div style={{paddingTop:15}}>
        <input type='text' class='input-1' placeholder='Latitude' style={inputStyle} onChange={(e)=>{
          const n = e.target.value
          setlat(lat => n)
        }}/><br/>
        <input type='text' class='input-1' placeholder='Longitude' style={inputStyle} onChange={(e)=>{
          const n = e.target.value
          setlong(long => n)
        }}/><br/>
      </div>
      <button class='but-1' style={butStyle} onClick={add}>Submit</button>
    </div>
  )
}

export default AddSingleNode
