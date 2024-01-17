import { presets } from '@babel/env';

module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-react" 
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime"
    ]
}