import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps"
import React,{Component} from 'react'
import { useSelector } from 'react-redux'
import {map} from 'underscore'

function Map(){
  const network = useSelector((state) => state.currentNetwork)
  const nodeStatus = useSelector((state) => state.nodeStatus)
  return(
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: network.nodes[0].lat, lng:network.nodes[0].long }}
    >
    {map(network.nodes, node => {
      let icon
      const index = network.nodes.indexOf(node)
      try{
        nodeStatus[index].status === 'online' ? (icon = 'green-dot.png'):(icon = 'red-dot.png')
      }catch(err){}
      return(
        <Marker position={{ lat: node.lat, lng: node.long }} icon={{
          url: `http://maps.google.com/mapfiles/ms/icons/${icon}`
        }}/>
      )
    })}
  </GoogleMap>
  )
}

const WrapperMap = withScriptjs(withGoogleMap(Map))

class MapDisplay extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <WrapperMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCw1pRYGsH-ls0l3N8aFqR2o-HH69840Yo&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `95vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}

        />
      </div>
    )
  }
}

export default MapDisplay
