const {app, BrowserWindow, dialog} = require('electron')
const funcs = require('../functions')
const NetworkScanner = require('network-scanner-js')
const netScan = new NetworkScanner()
const fs = require('fs')

function createWindow () {
  win = new BrowserWindow({width: 1040, height: 800})
  win.loadURL('http://localhost:3000/')
}

app.on('ready', ()=>{
  createWindow()
  funcs.startServer().on('connection', client => {
    let pingRunning
    client.on('cluster-ping', async(data)=>{
      const nodes = await funcs.clusterPing(data)
      client.emit('cluster-ping', nodes)
    })
    client.on('start-poll', (host)=>{
      pingRunning = setInterval(async()=>{
        const res = await funcs.poll(host)
        client.emit('poll', res)
      },1000)
    })
    client.on('trace', (dest)=>{funcs.traceroute(dest, (hop)=>{client.emit('trace', hop)})})

    client.on('save-file',(data)=>{
      funcs.saveFile(data)
    })
    client.on('get-ssl', async(url)=>{
      const ssl = await funcs.getSsl(url)
      client.emit('get-ssl', ssl)
    })

    client.on('start-scan', (range)=>{
      funcs.ipScan(range, (host)=>{
        client.emit('start-scan', host)
      }).then(()=>{
        client.emit('end-scan', 'done')
      })
    })

    client.on('scan-subnet', (subnet) => {
      funcs.getSubnet(subnet, (node)=>{
        client.emit('scan-subnet', node)
      }).then(()=>{
        client.emit('end-subnet', 'done')
      })
    })
  })
})
