const path = require("path");
const wne = require('webpack-node-externals');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'ReactBasicScroll',
        libraryTarget: 'umd'
    },
    mode: 'production',
    externals: [wne()],
    devtool: 'source-map',
    resolve: {
        extensions: ['.js','.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
        ]
    },
    // plugins: [htmlPlugin]
};