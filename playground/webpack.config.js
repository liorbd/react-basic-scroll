const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
    template: path.resolve(__dirname, "./index.html"),
    filename: "./index.html"
});

module.exports = {
    entry: path.resolve(__dirname, './index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    context: path.resolve(__dirname, './playground'),
    mode: 'development',
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
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    devServer: {
        compress: true,
        open: true,
        overlay: true,
        port: 3000,
        contentBase: path.join(__dirname, './playground/dist'),
    },
    plugins: [htmlPlugin]
};