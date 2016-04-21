var path = require("path");
var nodeModules = path.join(__dirname, "node_modules");

module.exports = {
    entry: {
        app: ["./app/index.jsx"]
    },
    output: {
        path: path.resolve(__dirname, "build/js"),
        //publicPath: "/assets/",
        filename: "bundle.js"
    },

    module: {
        noParse: [path.join(nodeModules,"react/dist/react")],
        preLoaders: [
            {
                test: /\.jsx?$/,
                exclude:/node_modules/,
                loader: 'eslint-loader'
            }
        ],
        loaders:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            }
        ]
    },
    //devServer: {
    //    historyApiFallback: true,
    //    inline: true,
    //    hot: true,
    //    progress: true
    //},
    resolve:{
        extensions: ["", ".js", ".jsx"],
        alias:{
            "react": path.join(nodeModules, "react/dist/react.js"),
            "react-dom": path.join(nodeModules, "react-dom/dist/react-dom.js")
        }
    }
};
