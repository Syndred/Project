const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        // target: "https://f95b-113-118-80-159.ngrok-free.app",
        target: "http://10.200.62.119:8080",
      },
    },
  },
});
