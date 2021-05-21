


module.exports = {

    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost",
        port: '8081',
        https: false,   //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: {
            '/apis': {
                target: 'https://zhitulist.com/academic/api/', //API服务器的地址
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/apis': ''
                },
            },
            '/api': {
                target: 'http://127.0.0.1:8000/api/', //API服务器的地址
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
            },
            '/aps': {
                target: 'http://47.92.240.36/academic-apply/apply/',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/aps': ''
                },
            },
        }
    },
    chainWebpack: config => {
        config.module.rule('images')
            .test(/\.(xlsx|png|jpe?g|gif|svg)(\?.*)?$/)
            .use('file-loader')
            .loader('file-loader')
            .options({ bypassOnDebug: true })
    }

}