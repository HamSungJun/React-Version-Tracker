const webpack = require('webpack')
const path = require('path')

const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {

    entry : path.join(__dirname,"/Components/src/Root.jsx"),

    output : {

        filename : "bundle.js",
        path : path.join(__dirname,"/public"),

    },

    module : {

        rules : [

            {
                test : /\.(js|jsx)$/,
                exclude : /(node_modules)/,
                include : path.join(__dirname, 'Components'),
                use : `babel-loader`,
            },

            {
                test : /\.(css|scss|sass)$/,
                exclude : /node_modules/,
                use : [
                    {loader : 'style-loader'},
                    {loader : 'css-loader'},
                    {loader : 'sass-loader'},
                ]
            },

        ]

    },

    plugins : [

        new webpack.ProgressPlugin(),

        new webpack.AutomaticPrefetchPlugin(),

        new webpack.NamedModulesPlugin(),

        // new CompressionPlugin({
        //
        //     filename: '[path].br[query]',
        //     algorithm: 'brotliCompress',
        //     test: /\.(js|css|html|svg|png|jpg|jpeg|gif)$/,
        //     compressionOptions: { level: 11 },
        //     threshold: 8192,
        //     minRatio: 0.8,
        //     deleteOriginalAssets: false
        //
        // }),

        new webpack.DefinePlugin({
            AUTHOR : JSON.stringify(`HSJPRIME`),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),

        }),

        new webpack.HotModuleReplacementPlugin()

    ],

    mode : `development`,

    devServer: {
        hot : true,
        contentBase: [
            path.join(__dirname, 'public'),
            path.join(__dirname, 'Components')],
        watchContentBase: true,
        historyApiFallback: true,
        compress: true,
        port: 9000
    },

    target : `web`,

    devtool : `source-map`

}
