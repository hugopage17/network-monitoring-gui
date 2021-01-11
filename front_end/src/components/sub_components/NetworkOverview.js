import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {useState, useEffect} from 'react'
import { map } from 'underscore'
import '../../stylesheets/overview.css'
import Loader from '../Loader'
import Pulse from './Pulse.js'
import {setNode, setNodeStatus} from '../../redux/actions'
import {responseTime} from '../../functions'
import { Doughnut } from 'react-chartjs-2'
import ToggleSwitch from './ToggleSwitch'
import Map from './Map'
import {isEven} from '../../functions'

function NetworkOverview(toggle, view, openNodeAdd){
  const [nodeStatus, setNodes] = useState([])
  const [viewMode, setView] = useState(true)

  const network = useSelector((state) => state.currentNetwork)
  const socket = useSelector((state) => state.socket)

  const dispatch = useDispatch()
  const selectNode = (node) => dispatch(setNode(node))
  const changeNS = (nodes) => dispatch(setNodeStatus(nodes))


  useEffect(()=>{
    if(network && view === true){
      var arr = []
      map(network.nodes, node => {arr.push(node.address)})
      var poller = setInterval(()=>{socket.emit('cluster-ping', arr)},2000)
      socket.on('cluster-ping', (data)=>{
        setNodes(nodeStatus => data)
        changeNS(data)
      })
      return () => clearInterval(poller)
    }
  })

  const openNode = (node) => {
    selectNode(node)
    toggle()
  }

  const searchNodes = () => {
    var input = document.getElementById('search-bar')
    var filter = input.value.toUpperCase();
    var nodes = document.getElementsByClassName('each-node')
    for (var i = 0; i < nodes.length; i++) {
      var txtValue = nodes[i].textContent || nodes[i].innerText
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        nodes[i].style.display = "";
      } else {
        nodes[i].style.display = "none";
      }
    }
}

const filter = (value) => {
  let nodes
  if(value === 'online'){
    nodes = document.getElementsByClassName('offline')
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].style.display = "none";
    }
  }else if(value === 'offline'){
    nodes = document.getElementsByClassName('online')
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].style.display = "none";
    }
  }else{
    nodes = document.getElementsByClassName('each-node')
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].style.display = ""
    }
  }
}

  return(
    <div>
      {network ? (
        <div class='all-nodes' hidden={!viewMode}>
          <div id='network-overview-top'>
            <label>{network.name}</label>
            <button class='but-1' style={{float:'right'}} onClick={()=>{openNodeAdd()}}>Add Node +</button>
          </div>
          {network.nodes.length === 0 ? (
            <div class='no-nodes-display' onClick={()=>{openNodeAdd()}}>
              <p>Add Nodes to {network.name}</p>
            </div>
          ):(
            <div>
              {nodeStatus.length === 0 ? (Loader()):(
                <div>
                  <div class='main-panel-overview'>
                    <div style={{borderRight:'1px solid rgba(92, 214, 255, 1)'}}>
                      <div class='node-view-topbar'>
                        <input type='text' id='search-bar' placeholder='Search...' onChange={searchNodes}/>
                        <select class='select-1' style={{marginLeft:10}} onChange={(e)=>{
                          const value = e.target.value
                          filter(value)
                        }}>
                          <option value='all'>Show all</option>
                          <option value='online'>Show online</option>
                          <option value='offline'>Show offline</option>
                        </select>
                      </div>
                      <div class='each-node-title'>
                        <label></label>
                        <label>Node</label>
                        <label>Response Time</label>
                        <label>Packet Loss</label>
                      </div>
                      {map(nodeStatus, node => {
                        const index = nodeStatus.indexOf(node)
                        const status = node.status === 'online' ? (true):(false)
                        return(
                          <div class={`each-node node-${isEven(index)} ${node.status}`} onDoubleClick={()=>{openNode(network.nodes[index])}}>
                            {Pulse(status)}
                            <label>{network.nodes[index].name}</label>
                            <label>{responseTime(node.res_avg)}</label>
                            <label>{node.packet_loss}%</label>
                          </div>
                        )
                        })}
                      </div>
                      <div><Map/></div>
                    </div>
                </div>
              )}
            </div>

          )}
        </div>
      ):(null)}
    </div>
  )
}

export default NetworkOverview
