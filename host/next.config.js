/* eslint-disable @typescript-eslint/no-require-imports */

const path = require('path');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, { isServer }) => {
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
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          products: `products@http://ip172-18-0-25-d28inlc69qi000aie8bg-3001.direct.labs.play-with-docker.com/_next/static/chunks/remoteEntry.js`,
          basket: 'basket@http://localhost:3002/_next/static/chunks/remoteEntry.js',
        },
        exposes: {
          './cartStore': './hooks/cartStore.ts',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: "^^18.2.0",
            eager: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: "^^18.2.0",
            eager: false,
          },
          zustand: { singleton: true },
        },
      })
    );

    config.cache = {
      type: 'memory', // disk yerine memory kullan
    };

    config.target = isServer ? 'node16' : 'web'; // veya node18

    return config;
  },

  images: {
    domains: ['fakestoreapi.com'],
  },

  transpilePackages: ['@module-federation'],

  reactStrictMode: false,
};
