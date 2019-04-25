module.exports = {
  devServer: {
    open: process.platform === "darwin",
    // host: "anttus.ddns.net",
    host: "localhost",
    port: 5000,
    https: true,
    hotOnly: false
  }
};
