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
    config.module.rules.push({
    test: /\.js$/,
    type: 'javascript/auto',
  });
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          products:'products@http://localhost:3001/_next/static/chunks/remoteEntry.js',
          basket: 'basket@http://localhost:3002/_next/static/chunks/remoteEntry.js',
        },
        exposes: {
          './cartStore': './hooks/cartStore.ts',
        },
        
        shared: {
          react: {
            singleton: true,
            requiredVersion: "^18.2.0",
            strictVersion: true,
            eager: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: "^18.2.0",
            strictVersion: true,
            eager: false,
          },
          zustand: { singleton: true,eager: false, },
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
