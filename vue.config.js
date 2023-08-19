const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        // target: "https://7648-113-100-10-5.ngrok-free.app",
        target: "http://192.168.33.207:8080",
      },
    },
  },
});