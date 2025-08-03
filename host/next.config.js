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
          basket: 'basket@http://localhost:3002/_next/static/chunks/remoteEntry.js',
        },
        exposes: {
          './cartStore': './utils/store/cartStore.ts',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion:'18.2.0',
            eager: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion:'18.2.0',
            eager: false,
          },
          zustand: { singleton: true },
        }
      }),
      
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
