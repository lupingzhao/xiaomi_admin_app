const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, { cors: true })

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/jsoncharset=utf-8")
  next()
})


io.on("connection", socket => {  // 客户端链接成功
  // 监听的频道必须和客户端监听的频道相同，等待消息
  console.log('连接成功')
  socket.on("event", msg => {
    // 向所有客户端发送信息
    io.emit("broadcast", msg)
  })
  // 接收图片信息
  socket.on('image', data => {
    // 广播给所有用户
    io.emit('receiveImage', data)
  })
  // 客户端断开链接 
  io.on("disconnect", () => {
    console.log('用户断开连接')
  })
})



server.listen(3000, () => {
  console.log('服务器启动成功了')
})