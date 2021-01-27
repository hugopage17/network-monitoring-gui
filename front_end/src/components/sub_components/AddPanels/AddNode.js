import '../../../stylesheets/custom_radio.css'
import '../../../stylesheets/App.css'
import AddSingleNode from './AddSingleNode'
import IPScan from './IPScan'
import AddSubnet from './AddSubnet'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {apiCall} from '../../../functions'
import {setNetwork} from '../../../redux/actions'

function AddNode(openAddPanel){
  const [single, toggleSingle] = useState(true)
  const [ip, toggleIp] = useState(false)
  const [subnet, toggleSub] = useState(false)
  const network = useSelector((state) => state.currentNetwork)
  const networks = useSelector((state) => state.appData.networks)
  const netIndex = useSelector((state) => state.index)

  const dispatch = useDispatch()
  const selectNetwork = (network) => dispatch(setNetwork(network))
  const user = useSelector((state) => state.user)


  useEffect(()=>{
    document.getElementById('single-radio').checked = true
  },[])

  const showSingle = () => {
    toggleSingle(single => true)
    toggleIp(ip => false)
    toggleSub(subnet => false)
  }

  const showIp = () => {
    toggleSingle(single => false)
    toggleIp(ip => true)
    toggleSub(subnet => false)
  }

  const showSubnet = () => {
    toggleSingle(single => false)
    toggleIp(ip => false)
    toggleSub(subnet => true)
  }

  const complete = () => {
    const index = networks.indexOf(network)
    return apiCall(`reload?index=${index}`, 'GET' , {}, user.uid).then((res)=>{
      selectNetwork(res.response)
      openAddPanel()
    })
  }

  return(
    <div id='full-bg-wrapper'>
      <div class='float-panel add-node-panel'>
        <div class='add-node-top'>
          <label class="container">Single Node
            <input type="radio" name="radio" id='single-radio' onChange={showSingle}/>
            <span class="checkmark" ></span>
          </label>
          <label class="container">IP Scan
            <input type="radio" name="radio" onChange={showIp}/>
            <span class="checkmark"></span>
          </label>
          <label class="container">Subnet Scan
            <input type="radio" name="radio" onChange={showSubnet}/>
            <span class="checkmark"></span>
          </label>
          <button class='but-1' style={{float:'right'}} onClick={()=>{openAddPanel()}}>x</button>
        </div>
        <div hidden={!single}>{AddSingleNode(()=>{openAddPanel()})}</div>
        <div hidden={!ip}>{IPScan(user.uid, netIndex, complete)}</div>
        <div hidden={!subnet}>{AddSubnet(user.uid, netIndex, complete)}</div>
      </div>
    </div>
  )
}

export default AddNode
