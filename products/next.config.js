/* eslint-disable @typescript-eslint/no-require-imports */
// next.config.js
const path = require('path');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, { isServer }) => {
    // React alias tanımlaması ile duplicate react sorununu engelleyelim
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
        name: 'products',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Products': './components/Products.tsx',
        },
        remotes: {
          host: 'host@http://ip172-18-0-25-d28inlc69qi000aie8bg-3000.direct.labs.play-with-docker.com/_next/static/chunks/remoteEntry.js',
        },
        shared: {
          react: { singleton: true, requiredVersion: "^18.2.0", eager: false },
          'react-dom': { singleton: true, requiredVersion: "^18.2.0", eager: false },
          zustand: {
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );

    if (!isServer) {
      config.output.publicPath = `http://localhost:3001/_next/`;
    }

    config.cache = {
      type: 'memory',
    };

    config.target = isServer ? 'node16' : 'web';

    return config;
  },

  images: {
    domains: ['fakestoreapi.com'],
  },
};
