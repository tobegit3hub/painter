var config = {
    //context: __dirname + ".",
    context: __dirname,
    entry: "./app.js",

    output: {
        filename: "bundle.js",
        path: __dirname + "/bundle",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'env']
                }
            }
        ],
    }
};
module.exports = config;
