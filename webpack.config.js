const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const WebpackMd5Hash = require("webpack-md5-hash");

// ----------------
// ENVIRONMENT VARS
// ----------------
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === "development";
const ENV_PRODUCTION = NODE_ENV === "production";
const ENV_TEST = NODE_ENV === "test";

const HOST = "0.0.0.0";
const PORT = 3000;

// -------
// LOADERS
// -------
const loaders = {
    // Convert jsx files into es5 code that we can use today.
    js: {
        // Tell which files to parse.
        test: /\.js$/,
        // Tell which folders we don't want to have parsed.
        exclude: /node_modules/,
        // The module.
        loader: "babel"
        // loader : ['react-hot', 'babel']
    },
    // Convert scss files into css files
    scss: {
        test: /\.scss$/,
        loader: "style!css!postcss!sass"
        // loaders: ["style-loader", "css-loader", "sass-loader"]
    }
};

// ------
// CONFIG
// ------
const config = {};
module.exports = config;

config.resolve = {
    extensions: ["", ".js"],
    // Always look for modules in the node_modules folder by default.
    modulesDirectories: ["node_modules"],
    // Resolve the current path into an absolute path
    // meaning "What is my destination if I take this path."
    root: path.resolve(".")
};

config.plugins = [
    // Create a process variable that has the property env
    // and its NODE_ENV is equal to NODE_ENV (development, production or test).
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
    })
];

config.postcss = [
    // Use last 3 version of browsers for the CSS.
    autoprefixer({
        browsers: ["last 3 versions"]
    })
];

config.sassLoader = {
    outputStyle: "compressed",
    precision: 10,
    sourceComments: false
};

// -------------------------
// DEVELOPMENT or PRODUCTION
// -------------------------
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
    // Where to start processing our code.
    // Inputs
    config.entry = {
        main: ["./src/main.js"]
    };

    // Specify where to dump the bundled file.
    // Output
    config.output = {
        // [name] in this case is main.
        filename: "[name].js",
        // Resolve the ./target path into an absolute path.
        path: path.resolve("./public"),
        // Public path for the user.
        publicPath: "/"
    };

    // Generate HTML for the application
    // with all the css and js injected to it.
    config.plugins.push(
        new HtmlWebpackPlugin({
            chunkSortMode: "dependency",
            filename: "index.html",
            hash: false,
            inject: "body",
            template: "./src/template/index.html",
            favicon: "./src/template/favicon.ico"
        })
    );
}

// -----------
// DEVELOPMENT
// -----------
if (ENV_DEVELOPMENT) {
    // Create source map which are very important debugging tools.
    // cheap-module-eval-source-map not working
    config.devtool = "cheap-module-source-map";
    // config.devtool = "eval";

    // Use react-hot-loader for the pages served.
    // The react-hot-loader here is the beta version.
    config.entry.main.unshift(
        `webpack-dev-server/client?http://${ HOST }:${ PORT }`,
        "webpack/hot/only-dev-server",
        "react-hot-loader/patch",
        "babel-polyfill"
    );

    // Add the js and css loaders into the modules.
    config.module = {
        loaders: [
            loaders.js,
            loaders.scss
        ]
    };

    // Include the hot replacement plugin from webpack in the plugins.
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );

    // Configure the dev server running react hot loader.
    config.devServer = {
        contentBase: "./src",
        historyApiFallback: true,
        host: HOST,
        hot: true,
        port: PORT,
        publicPath: config.output.publicPath,
        stats: {
            cached: true,
            cachedAssets: true,
            chunks: true,
            chunkModules: false,
            colors: true,
            hash: false,
            reasons: true,
            timings: true,
            version: false
        }
    };
}

// ----------
// PRODUCTION
// ----------
if (ENV_PRODUCTION) {
    // Create source map which are very important debugging tools.
    config.devtool = "source-map";

    // Split app and vendor code
    // This will remove all modules in the vendor chunk from the app chunk.
    // The bundle.js will now contain just your app code, without any of its dependencies.
    // These are in vendor.bundle.js.
    config.entry.vendor = "./src/vendor.js";

    // The output file name of the vendor.bundle.js.
    config.output.filename = "[name].[chunkhash].js";

    // Add the js and css loaders into the modules.
    config.module = {
        loaders: [
            loaders.js,
            // With this styles are no longer inlined into the javascript,
            // but separate in a css bundle file (styles.css).
            // If total stylesheet volume is big, it will be faster because the stylesheet bundle
            // is loaded in parallel to the javascript bundle.
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("css?-autoprefixer!postcss!sass")
            }
        ]
    };

    config.plugins.push(
        // Replace a standard webpack chunkhash with md5.
        new WebpackMd5Hash(),
        // Move every require("style.css") in entry chunks into a separate css output file.
        new ExtractTextPlugin("styles.[contenthash].css"),
        // For the vendor code
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        // Search for equal or similar files and deduplicate them in the output.
        new webpack.optimize.DedupePlugin(),
        // Minimize all JavaScript output of chunks. Loaders are switched into minimizing mode.
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                dead_code: true, // eslint-disable-line camelcase
                screw_ie8: true, // eslint-disable-line camelcase
                unused: true,
                warnings: false
            }
        })
    );
}

// ----
// TEST
// ----
if (ENV_TEST) {
    // Create source map which are very important debugging tools.
    config.devtool = "inline-source-map";

    // Add the js and css loaders into the modules.
    config.module = {
        loaders: [
            loaders.js,
            loaders.scss
        ]
    };
}
