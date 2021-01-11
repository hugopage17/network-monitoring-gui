import '../stylesheets/sidebar.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { map } from 'underscore'
import {setNetwork} from '../redux/actions'
import AddNetwork from './sub_components/AddPanels/AddNetwork'
import {useState} from 'react'
import {apiCall} from '../functions'

function Sidebar() {
  const networks = useSelector((state) => state.appData.networks)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const selectNetwork = (network) => dispatch(setNetwork(network))
  const [addPanel, togglePanel] = useState(true)
  const socket = useSelector((state) => state.socket)

  const openPanel = () => {
    togglePanel(addPanel => !addPanel)
  }

  const saveFile = () => {
    socket.emit('save-file', JSON.stringify(networks, null, 2))
  }

  const importNetwork = () => {
    const uploader = document.getElementById('file-chooser')
    uploader.click()
    uploader.addEventListener('change', (e)=>{
       const reader = new FileReader()
       reader.onload = ()=>{
         const data = JSON.parse(reader.result)
         for (var i = 0; i < data.length; i++) {
           const index = data[i]
           apiCall('newnetwork', 'POST', index, user.uid)
         }
       }
       reader.readAsText(uploader.files[0])
     }, false)
  }

  return (
    <div id='sidebar'>
      <div id='sidebar-top'>
        <label>Add new network <button class='but-1' onClick={openPanel}>+</button></label>
      </div>
      <div>
        {map(networks, net => {
          return(
            <div onDoubleClick={()=>{selectNetwork(net)}} class='each-sidebar-network'>
              <h2>{net.name}</h2>
              <label>Nodes: {net.nodes.length}</label>
            </div>
          )
        })}
      </div>
      <div class='sidebar-bottom'>
        <label style={{float:'left'}} onClick={importNetwork}>Import</label>
        <label style={{float:'right'}} onClick={saveFile}>Export</label>
        <input type='file' id='file-chooser'  hidden={true}/>
      </div>
      <div hidden={addPanel}>
        {AddNetwork(openPanel)}
      </div>
    </div>
  )
}

export default Sidebar
