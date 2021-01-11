import '../../../stylesheets/App.css'
import {apiCall} from '../../../functions'
import { useSelector } from 'react-redux'
import {useState} from 'react'


function AddNetwork(open){
  const user = useSelector((state) => state.user)
  const [networkName, setName] = useState('')

  const inputStyle = {
    margin:10,
    width:'80%'
  }

  const butStyle = {
    width:'84%',
    padding:10,
    backgroundColor:'#0f0f0f',
    margin:10
  }

  const style = {
    position:'absolute',
    width:'90%',
    top:'20%',
    left:'10%'
  }

  const addNetwork = () => {
    const body = {
      name:networkName,
      nodes:[]
    }
    apiCall('newnetwork', 'POST', body, user.uid).then((res)=>{
      open()
    })
  }

  return(
    <div id='full-bg-wrapper'>
      <div class='float-panel'>
        <button class='but-1' style={{margin:'20px',fontSize:18}} onClick={()=>{open()}}>x</button>
        <div style={style}>
          <h1>Add New Network</h1>
          <input type='text' class='input-1' placeholder='Network name' style={inputStyle} onChange={(e)=>{
            const name = e.target.value
            setName(networkName => name)
          }}/><br/>
          <button class='but-1' style={butStyle} onClick={addNetwork}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default AddNetwork
