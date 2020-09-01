const {
  default: WatchExternalFilesPlugin,
} = require('webpack-watch-files-plugin')

const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // config.plugins.push(new webpack.IgnorePlugin(/\/public\//));
    // config.plugins.push(new webpack.IgnorePlugin(/jsconfig.*/));
    // config.plugins.push(new webpack.IgnorePlugin(/.\/*.lock/));
    config.plugins.push(
      new WatchExternalFilesPlugin({
        files: ['./garden/**/*.mdx'],
      }),
    )

    // console.log(JSON.stringify(config, null, 2));
    // Important: return the modified config
    return config
  },
})
