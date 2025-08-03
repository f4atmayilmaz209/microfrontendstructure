'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const Remotebasket = dynamic(() => import('basket/Basket'), {
  ssr: false,
  loading: () => <p>Yükleniyor...</p>,
});

const RemoteBasketWrapper = () => {


  return (
    <div>
      <Remotebasket />
    </div>
  );
};

export default RemoteBasketWrapper;