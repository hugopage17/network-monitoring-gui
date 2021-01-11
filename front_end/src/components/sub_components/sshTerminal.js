import React, {Component} from 'react'
import socketIOClient from 'socket.io-client'

class SshTerminal extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const socket = socketIOClient('http://localhost:5000')
    socket.on('output', (data) => {
      console.log(data)
    })
  }
}
