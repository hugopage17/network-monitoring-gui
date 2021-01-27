import React,{Component} from 'react'
import socketIOClient from 'socket.io-client'

class Ssh extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    const socket = socketIOClient('http://localhost:5000')
    const node = this.props.node
    socket.emit('run-ssh', {username:'admin',password:'3wRgbMQ8bJcBakM', ip:node.address, port:2222})
    socket.on('ssh-output', (data)=>{
      let content
      for (var i = 0; i < data.split('\n').length; i++) {
        const text = data.split('\n')[i]
        content += text
      }
      document.getElementById('ssh-terminal').innerText += content
    })
  }

  render(){
    return(
      <div class='full-ssh-wrapper' >
        <textarea id='ssh-terminal'/>
      </div>
    )
  }

}

export default Ssh
