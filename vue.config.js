const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    proxy: {
      "/api": {
        // 注意：target 只需要指向后端服务器域名，不要包含具体路径
        target: "http://cbf6df82.natappfree.cc",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", // 重写路径，去掉/api前缀
        },
      },
    },
  },
});
