export const setSocket = (socket) => ({
  type:'SET_SOCKET',
  payload:socket
})

export const setUser = (user) => ({
  type:'SET_USER',
  payload:user
})

export const getAppData = (data) => ({
  type:'GET_APP_DATA',
  payload:data
})

export const setNetwork = (network) => ({
  type:'SET_NETWORK',
  payload:network
})

export const setNodeStatus = (nodes) => ({
  type:'SET_NODE_STATUS',
  payload:nodes
})

export const setNode = (node) => ({
  type:'SET_NODE',
  payload:node
})

export const setIndex = (index) => ({
  type:'SET_INDEX',
  payload:index
})
