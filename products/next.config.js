// next.config.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'products',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Products': './components/Products.tsx',
        },

        shared: {
          react: { singleton: true, requiredVersion: false,eager: false, },
          'react-dom': { singleton: true, requiredVersion: false,eager: false, },
        },
      })
    );
    if (!isServer) {
      config.output.publicPath = `http://localhost:3001/_next/`;
    }
    config.cache = {
      type: 'memory', // disk yerine memory kullan
    };
    config.target = isServer ? 'node16' : 'web'; // veya node18
    return config;
  },
};
