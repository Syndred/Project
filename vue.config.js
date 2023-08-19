const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
<<<<<<< HEAD
        // target: "https://7648-113-100-10-5.ngrok-free.app",
        target: "http://192.168.33.207:8080",
=======
        // target: "https://f95b-113-118-80-159.ngrok-free.app",
        target: "http://10.200.62.119:8080",
>>>>>>> 6de3bebb0a3c825949a5d38ee73ff4d1fe7367ea
      },
    },
  },
});