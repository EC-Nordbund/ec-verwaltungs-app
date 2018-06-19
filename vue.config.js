const { BannerPlugin } = require('webpack')

let toYear = new Date()
  .getFullYear()
  .toString()
  .split('')
  .slice(2)
  .join('')

module.exports = {
  baseUrl:
    process.env.NODE_ENV === 'development'
      ? undefined
      : './',
  outputDir: 'electron/src/renderer',
  runtimeCompiler: false,
  productionSourceMap: false,
  devServer: {
    port: 8080
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        }
      ]
    },
    plugins: [
      new BannerPlugin({
        banner: `EC-Verwaltungs-App
Copyright (C) 2017-${toYear} EC-Nordbund (Sebastian Krüger & Tobias Krause)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.`,
        exclude: /.*vendor.*\w/g
      })
    ]
  }
}
