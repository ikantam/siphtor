import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default function (app) {
  let env = app.get('env');
  if (env == 'development') {
    let webpackConfig = require('../../../../webpack.dev').default;
    webpackConfig.mode = env
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
      noInfo: false,
      publicPath: webpackConfig.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
  } else {
    let webpackConfig = require('../../../../webpack.prod').default;
  }
}
