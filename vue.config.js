module.exports = {
  configureWebpack: (config) => {
    config.devtool = "source-map";
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/scss/variables.scss";
            @import "@/scss/mixins.scss";
        `,
        sourceMap: true,
      },
    },
    sourceMap: true,
  },

  devServer: {
    host: "localhost",
  },
};
