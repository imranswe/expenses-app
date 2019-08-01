
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test'){
    require('dotenv').config({path: '.env.test'});
}
else if(process.env.NODE_ENV === 'development'){
    require('dotenv').config({path: '.env.development'});
}

module.exports =  (env, argv) => ({
     
    entry: {
        bundle:['./src/index.js','./src/styles/styles.scss'],
    },
    output: {
        path: path.resolve(__dirname,"public"),
        filename: 'js/[name].js'
    },
    
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_moduels/
            },
            
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: argv.mode === 'development',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          //filename: argv.mode === 'production' ? 'css/[name].[hash].css' : 'css/[name].css',
          //chunkFilename: argv.mode === 'production' ? 'css/[id].[hash].css' : 'css/[id].css',

          filename: 'css/[name].css',
          chunkFilename: 'css/[id].css',
        }),
        new webpack.DefinePlugin({
            'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
            'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
            'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
            'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
            'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
            'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID)
        })
    ],
    devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname,"public"),
        watchContentBase: true,
        historyApiFallback: true
    }
});