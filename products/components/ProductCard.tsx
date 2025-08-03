// components/ProductCard.tsx
'use client';

import React from 'react';
import { Card, Typography, Image } from 'antd';
import { Product } from '@/pages/api/product';

const { Meta } = Card;
const { Text, Paragraph } = Typography;

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Card
      hoverable
      style={{ width: 280, borderRadius: 12 }}
      cover={
        <Image
          alt={product.title}
          src={product.image}
          height={240}
          style={{ objectFit: 'contain', padding: '1rem' }}
          preview={false}
        />
      }
    >
      <Meta
        title={<Text strong>{product.title.slice(0, 40)}...</Text>}
        description={
          <>
            <Paragraph ellipsis={{ rows: 2 }}>
              {product.description}
            </Paragraph>
            <Text type="success" strong>
              ${product.price}
            </Text>
          </>
        }
      />
    </Card>
  );
};

export default ProductCard;
