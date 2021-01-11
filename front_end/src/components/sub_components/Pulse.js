import '../../stylesheets/pulse.css'

function Pulse(online){
  return(
    <div>
      {online ? (<div id='pulse'><span class="pulse"></span></div>):(<div id='pulse'><span class="pulse-red"></span></div>)}
    </div>
  )
}

export default Pulse
