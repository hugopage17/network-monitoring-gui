import NetworkOverview from './sub_components/NetworkOverview'
import NodeView from './sub_components/NodeView'
import {useState} from 'react'

function NetworkPanel(openNodeAdd){
  const [view, setView] = useState(true)
  const toggle = () => {
    setView(view => !view)
  }

  return(
    <div>
      <div hidden={!view}>{NetworkOverview(toggle, view, openNodeAdd)}</div>
      <div hidden={view}>{NodeView(toggle, view)}</div>
    </div>
  )

}

export default NetworkPanel
