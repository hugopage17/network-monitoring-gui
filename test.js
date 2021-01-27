const { exec, spawn } = require('child_process')


const run = (cb) => {
  return exec('test_2 admin 3wRgbMQ8bJcBakM 10.167.4.44 2222 interface%20print', (err, stdout, stderr) => {
      if (err) {
        return err
      } else {
       cb(stdout)
      }
  })
}

run((output)=>{
  console.log(output);
})
