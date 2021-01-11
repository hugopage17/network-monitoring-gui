import '../../stylesheets/toggle-switch.css'
import { useDispatch } from 'react-redux'
import {useState, useEffect} from 'react'

function ToggleSwitch(){
  const dispatch = useDispatch()
  const [switchState, toggleState] = useState(false)


  useEffect(()=>{
    document.getElementById('main-check').checked = true
  },[])

  return(
    <label class="switch">
      <input type="checkbox" id='main-check'  onChange={(e)=>{
        const value = e.target.checked
        
      }}/>
      <span class="slider round"></span>
    </label>
  )
}

export default ToggleSwitch
