const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware('/', {
      target: 'http://backend:8080',
      changeOrigin: true
    })
  )
  
};
#출처: https://woochan-dev.tistory.com/94 [우찬쓰 개발블로그:티스토리]
