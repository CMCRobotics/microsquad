const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    entry: "./src/app.ts", 
    output: {
        publicPath: "/",
        filename: "js/bundle.js",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
        }),
        new CleanWebpackPlugin(),
        new DotenvWebpackPlugin()
    ],
};