const path = require('path')
const AppSourceDir = path.join(__dirname, '..', 'src')

// `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
// You can change the configuration based on that.
// 'PRODUCTION' is used when building the static version of storybook.
module.exports = async ({ config, mode }) => {
  // Disable the Storybook internal-`.svg`-rule for components loaded from our app.
  const svgRule = config.module.rules.find((rule) => 'test.svg'.match(rule.test));
  svgRule.exclude = [AppSourceDir];

  config.module.rules.push({
      test: /\.svg$/i,
      include: [ AppSourceDir ],
      use: ["@svgr/webpack"]
  })

  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: [AppSourceDir]
  })

  // config.resolve = {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //   },
  // }

  // Return the altered config
  return config
};
