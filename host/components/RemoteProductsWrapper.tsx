'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const RemoteProducts = dynamic(() => import('products/Products'), {
  ssr: false,
  loading: () => <p>Yükleniyor...</p>,
});

const RemoteProductsWrapper = () => {
  return (
    <div>
      <RemoteProducts />
    </div>
  );
};

export default RemoteProductsWrapper;