const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      optimization: {
        ...env.optimization,
        minimize: false,
      },
      babel: {
        dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components'],
      },
    },
    argv
  )
  return config
}
