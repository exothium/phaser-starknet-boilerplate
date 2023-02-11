/* jshint ignore:start */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/game.ts'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [{ test: /\.tsx?$|\.jsx?$/, include: path.join(__dirname, '../src'), loader: 'ts-loader' }]
    },
    plugins: [
        new HtmlWebpackPlugin({gameName: 'Phaser-Starknet SDK', template: 'src/index.html'}),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/assets', to: 'assets'}
            ]
        })
    ],
};
