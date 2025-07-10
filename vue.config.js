const { defineConfig } = require("@vue/cli-service");
const { VantResolver } = require("@vant/auto-import-resolver");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    proxy: {
      "/api": {
        // 注意：target只需要指向后端服务器域名，不要包含具体路径
        target: "http://cc8ed78b.natappfree.cc",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", // 重写路径，去掉/api前缀
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      // 当 unplugin-vue-components 版本小于 0.26.0 时，使用以下写法
      AutoImport({ resolvers: [VantResolver()] }),
      Components({ resolvers: [VantResolver()] }),
      //当 unplugin-vue-components 版本大于等于 0.26.0 时，使用以下写法
      // AutoImport.default({
      //   resolvers: [VantResolver()],
      // }),
      // Components.default({ resolvers: [VantResolver()] }),
    ],
  },
});
