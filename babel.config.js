export default {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
    ],
    ignore: [
        /node_modules/        // skip transforming any modules under node_modules
    ]
};
