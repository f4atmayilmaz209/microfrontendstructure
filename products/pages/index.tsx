import React from 'react';
import dynamic from 'next/dynamic';

const Products = dynamic(() => import('../components/Products'), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>Products Remote</h1>
      <Products />
    </div>
  );
}