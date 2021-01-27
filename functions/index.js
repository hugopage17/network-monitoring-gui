const NetworkScanner = require('network-scanner-js')
const netScan = new NetworkScanner()
const io = require('socket.io')({
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
})

const {dialog} = require('electron')
const fs = require('fs')
const { exec } = require('child_process');


exports.startServer = () => {
  return io.listen(5000)
}

exports.poll = (host) => {
  return netScan.poll(host, {repeat:4,size:32,timeout:1}).then((res)=>{
    return res
  })
}

exports.clusterPing = (arr) => {
  return new Promise((res, rej) => {
    return netScan.clusterPing(arr, (hosts)=>{
      res(hosts)
    })
  })
}

exports.traceroute = (dest, cb) => {
  return netScan.traceroute(dest, (hop)=>{
    cb(hop)
  })
}

exports.saveFile = (data) => {
  return dialog.showSaveDialog({}).then(result => {
  let filename = result.filePath;
  if (filename === undefined) {
    return;
  }
  return fs.writeFile(filename, data, (err) => {
    if (err) {
      return
    }
    return 'save successful'
  })
}).catch(err => {
    return err
  })
}

exports.getSsl = (url) => {
  return netScan.getSsl(`https://${url}`).then((cert)=>{
    return cert
  })
}

const getRange = (range) => {
  if(range.includes('-') === false)
    throw new Error('Invalid IP Range, e.g(192.168.1.1-254)')
  if(!range)
    throw new Error('IP Range cannot be null, e.g(192.168.1.1-254)')
  var array = []
  let network = range.split('-')[0]
  var max = range.split('-')[1]
  if(max > 255)
    throw new Error('Invalid IP Range, e.g(192.168.1.1-254)')
  const min = network.split('.')[3]
  network = network.replace(min, '')
  for (var i = min; i <= max; i++) {
    const node = network.concat(i)
    array.push(node)
  }
  return array
}

exports.ipScan = async(range, cb) => {
  const arr = getRange(range)
  let p = await Promise.all(arr.map(async (a) => {
    try{
      const each_node = await netScan.poll(a)
      cb(each_node)
    }catch(err){
      throw new Error(err)
    }
  }))
  return p
}

exports.getSubnet = (subnet, cb) => {
  return netScan.getSubnet(subnet).then((net)=>{
    return netScan.ipScan(net.host_range, (host)=>{
      cb(host)
    })
  })
}

exports.sshCmd = (data, cb) => {
  let port = data.port
  if(port === null){
    port = 22
  }
  return exec(`test_2 ${data.username} ${data.password} ${data.ip} ${port} interface%20print`, (err, stdout, stderr) => {
      if (err) {
        cb(err)
      } else {
        cb(stdout)
      }
  })
}
