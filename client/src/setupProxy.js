const { createProxyMiddleware }  = require("http-proxy-middleware");

module.exports = (app) =>{
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:5100',
            changeOrigin: true,
            pathRewrite : {
                "^/api": "/" 
                // react에서는 "/api"로 보내지만 서버에서는 "/"로 api라는 단어를 생략하고 받음
            }
        })
    )
}