export const getMin = (min, value) => {
  if(value < min || min === 0){
    min = value
  }
  return min
}

export const getMax = (max, value) => {
  if(value > max || max === 0){
    max = value
  }
  return max
}

export const getAvg = (times) => {
  let total = 0
  for (var i = 0; i < times.length; i++) {
    if(!isNaN(times[1])){
      total+=Number(times[i])
    }
  }
  let avg = total/Number(times.length)
  return Math.round(avg * 100) / 100
}

export const responseTime = (res) => {
  let response = res
  if(response === 'unknownms')response = 'Unreachable'
  return response
}

export const apiCall = async(dir, method, body, id) => {
  let options
  if(method === 'GET'){
    options = {
      method:method,
      headers:{
        'Authorization':id,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  }
  else if(method === 'POST'){
    options = {
      method:method,
      headers:{
        'Authorization':id,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(body)
    }
  }
  let res = await fetch(`http://localhost:7000/${dir}`, options)
  let data = await res.json()
  return data
}

export const isEven = (index) => {
  if ((index+1)%2 === 0)
    return 'even';
  else
    return 'odd';
}

export const getRange = (range) => {
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
  let total = 0
  for (var i = min; i <= max; i++) {
    total++
  }
  return total
}
