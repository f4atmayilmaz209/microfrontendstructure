// next.config.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          products: `products@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
        },
        exposes: {
          // host bu projede bir şey paylaşmıyor, istersen buraya ekleyebilirsin
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
            eager: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
            eager: false,
          },
        }
      }),
      
    );
      config.cache = {
      type: 'memory', // disk yerine memory kullan
    };
    config.target = isServer ? 'node16' : 'web'; // veya node18
    return config;
  },
  transpilePackages: ['@module-federation'],
  reactStrictMode: false,
};
