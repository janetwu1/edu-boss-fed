const express = require('express')
const app = express()
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')

app.use('/boss', createProxyMiddleware({
  target: 'http://eduboss.lagou.com',
  changeOrigin: true
}))

app.use('/front', createProxyMiddleware({
  target: 'http://edufront.lagou.com',
  changeOrigin: true
}))
// app.get('/',(req,res) => {
//     res.send('hello')
// })
// 托管dist目录, 当访问 / 的时候，默认会返回托管目录中的index.html
app.use(express.static(path.join(__dirname, '../dist')))

app.listen(3000, () => {
  console.log('runing...')
})
