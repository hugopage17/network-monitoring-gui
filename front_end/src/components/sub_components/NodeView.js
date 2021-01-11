import { useSelector } from 'react-redux'
import {useState, useEffect} from 'react'
import LatencyGraph from './LatencyGraph'
import PingHistory from './PingHistory'
import Traceroute from './Traceroute'
import LatencyStats from './LatencyStats'
import socketIOClient from 'socket.io-client'

function NodeView(toggle, view){
  const [stats, getStats] = useState([])
  const [times, addTimes] = useState([])
  const [loss, addLoss] = useState([])
  const [labels, setLabels] = useState([])
  const [infoView, changeInfo] = useState(true)
  const [pingStats, setPingStats] = useState({})
  const node = useSelector((state) => state.currentNode)
  const socket = socketIOClient('http://localhost:5000')
  const [running, isRunning] = useState(false)

  useEffect(()=>{
    var container = document.getElementById('full-ping-wrapper')
    try{
      container.scrollTop = container.scrollHeight
    }catch(err){}

    if(node && view === false){
      if(running === false){
        socket.emit('start-poll', node.address)
        isRunning(running => true)
      }
      socket.on('poll', (data)=>{
        getStats(stats => [...stats, data])
        addTimes(times => [...times, Number(data.res_avg.split('.')[0])])
        if(data.packet_loss === 'unknown'){
          data.packet_loss = 100
        }
        addLoss(loss => [...loss, data.packet_loss])
        setLabels(labels => [...labels, labels.length+1])
        setPingStats(pingStats => data)
      })
      return
    }
  })

  const toggleInfo = (mode) => {
    changeInfo(infoView => mode)
  }

  const back = () => {
    toggle()
    getStats(stats => [])
    addTimes(times => [])
    addLoss(loss => [])
    setLabels(labels => [])
    setPingStats(pingStats => {})
  }

  try{
    return(
      <div id='node-view-wrapper'>
        <div class='node-view-top'>
          <button class='but-1' style={{float:'left',marginRight:10}} onClick={back}>Back</button>
          <h2>{node.name}</h2>
          <LatencyStats ping={pingStats} times={times}/>
        </div>
        <div><LatencyGraph times={times} labels={labels} loss={loss}/></div>
        <div class='node-options'>
          <label onClick={()=>{toggleInfo(true)}}>Latency Report</label>
          <label onClick={()=>{toggleInfo(false)}}>Traceroute</label>
        </div>
        <div class='node-info-wrapper' id='full-ping-wrapper'>
          <div hidden={!infoView}>
            <PingHistory data={stats}/>
          </div>
          <div hidden={infoView}>
            <Traceroute dest={node.address}/>
          </div>
        </div>
      </div>
    )
  }catch(err){}

}

export default NodeView
