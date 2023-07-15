/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  ...nextConfig,
  cssLoaderOptions: {
    importLoaders: 1,
    modules: {
      auto: true,
      localIdentName: '[local]___[hash:base64:5]'
    },
    // Certifique-se de incluir extractCSS: true
    extractCSS: true
  }
}
