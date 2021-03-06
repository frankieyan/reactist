const path = require('path')
const webpack = require('webpack')
const getComponentsMap = require('./scripts/buildHelpers').getComponentsMap

const BASE_CONFIG = {
    entry: './src/index.js',
    devtool: 'source-map',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'reactist.js',
        library: 'reactist',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        sourceMapFilename: 'reactist.map'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            'node_modules',
            'src'
        ],
        extensions: ['.webpack.js', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            },
            {
                test: /\.svg$/,
                use: [{ loader: 'svg-url-loader' }]
            }
        ]
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
        dayjs: 'dayjs',
        classnames: 'classnames',
        'prop-types': 'prop-types'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
}

const createConfig = overriddenAttributes => ({
    ...BASE_CONFIG,
    ...overriddenAttributes
})

const mainConfig = createConfig()
const modulesConfig = createConfig({
    entry: getComponentsMap(path.resolve(__dirname, './src/components')),
    output: {
        ...BASE_CONFIG.output,
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js',
        sourceMapFilename: '[name].map'
    }
})

module.exports = [mainConfig, modulesConfig]
