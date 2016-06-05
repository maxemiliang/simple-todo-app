var webpack = require('webpack');


module.exports = {
    context: __dirname,
    entry: "./public/js/script.js",
    output: {
        path: __dirname + "/public/js/dist",
        filename: "script.min.js"
    },
    plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
}
