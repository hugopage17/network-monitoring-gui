import './stylesheets/App.css'
import {useState, useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import Sidebar from './components/Sidebar'
import NetworkPanel from './components/NetworkPanel'
import AddNode from './components/sub_components/AddPanels/AddNode'
import { useDispatch } from 'react-redux'
import {setSocket, setUser, getAppData} from './redux/actions'
import fire from './Fire.js'

function Main() {
  const socket = socketIOClient('http://localhost:5000')
  const dispatch = useDispatch()
  const saveSocket = (socket) => dispatch(setSocket(socket))
  const getUser = (user) => dispatch(setUser(user))
  const setAppData = (data) => dispatch(getAppData(data))

  const [nodeAdd, openNodeAdd] = useState(true)

  useEffect(() => {
    saveSocket(socket)
    return fire.auth().onAuthStateChanged(user => {
      if(user){
        getUser(user)
        fire.firestore().collection("users").doc(user.uid).onSnapshot((doc) => {
          const data = doc.data()
          setAppData(data)
        })
      }
    })
  },[])

  const openAddPanel = () => {
    openNodeAdd(nodeAdd => !nodeAdd)
  }

  return (
    <div>
      {Sidebar()}
      <div id='main-panel'>
        {NetworkPanel(openAddPanel)}
      </div>
      <div hidden={nodeAdd}>
        {AddNode(openAddPanel)}
      </div>
    </div>
  )
}

export default Main;
