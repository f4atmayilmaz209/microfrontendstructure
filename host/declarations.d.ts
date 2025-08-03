declare module 'products/Products' {
  import { FC } from 'react';
  const RemoteProducts: FC;
  export default RemoteProducts;
}

declare module 'basket/Basket' {
  import React from 'react';
  const Basket: React.ComponentType;
  export default Basket;
}