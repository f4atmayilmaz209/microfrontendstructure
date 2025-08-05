/* eslint-disable @typescript-eslint/no-require-imports */
// next.config.js
const path = require('path');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, { isServer }) => {
    // React ve ReactDOM alias tanımlaması (mismatch ve duplicate react önlemek için)
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias || {}),
        react: path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      },
    };

    config.plugins.push(
      new NextFederationPlugin({
        name: 'basket',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Basket': './components/Basket.tsx',
        },
        remotes: {
          host: 'host@http://localhost:3000/_next/static/chunks/remoteEntry.js',
        },
        shared: {
          react: { singleton: true, requiredVersion: "^18.2.0", eager: false },
          'react-dom': { singleton: true, requiredVersion: "^18.2.0", eager: false },
          zustand: { singleton: true },
        },
      })
    );

    if (!isServer) {
      config.output.publicPath = `http://localhost:3002/_next/`;
    }

    config.cache = {
      type: 'memory', // disk yerine memory kullan
    };

    config.target = isServer ? 'node16' : 'web'; // veya node18

    return config;
  },

  images: {
    domains: ['fakestoreapi.com'],
  },
};
