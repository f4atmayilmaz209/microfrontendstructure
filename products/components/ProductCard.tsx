/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { Card, Typography, Button } from 'antd';
import Image from 'next/image';
import { Product } from '@/pages/api/product';
import { useCartStore } from 'host/cartStore';


const { Meta } = Card;
const { Paragraph, Text } = Typography;

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
   const addToCart = useCartStore((state) => state.addToCart);
   
  return (
    <Card
      hoverable
      style={{ borderRadius: 12, overflow: 'hidden' }}
      cover={
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 240,
            backgroundColor: '#f9fafb',
          }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            // Resmin kapsayıcı alanını tam olarak kaplamasını ve oranlarını korumasını sağlar (responsive).
            style={{ objectFit: 'contain' }}
            priority={false}
            // "sizes" özelliği, farklı ekran boyutlarında resmin uygun çözünürlükte yüklenmesini sağlar (responsive optimization).
            sizes="(max-width: 640px) 100vw, 240px"
          />
        </div>
      }
      // Kart içeriği yüksekliği sabit, alt ve üst kısımlar esnek aralıkla yerleşir (mobilde de düzenli görünür).
      bodyStyle={{
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        height: 220,
        justifyContent: 'space-between',
      }}
    >
      <Meta
        title={
          <Text strong ellipsis={{ tooltip: product.title }}>
            {/* Başlık çok uzunsa taşmayı engelleyip "..." ile kısaltır (responsive metin dar alan için). */}
            {product.title.length > 40 ? product.title.slice(0, 40) + '...' : product.title}
          </Text>
        }
        description={
          <>
            <Paragraph
              // Açıklama metni 2 satırı geçerse "..." ile kısaltılır. Responsive metin uyumu sağlar.
              ellipsis={{ rows: 2, expandable: false }}
              style={{ marginBottom: 12 }}
            >
              {product.description}
            </Paragraph>

            <div
              // Fiyat ve buton satırı, ekran boyutundan bağımsız olarak yatayda düzgün hizalanır.
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text type="success" strong style={{ fontSize: 18 }}>
                ${product.price}
              </Text>

              <Button
                type="primary"
                onClick={() =>
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  })
                }
              >
                Sepete Ekle
              </Button>
            </div>
          </>
        }
      />
    </Card>
  );
};

export default ProductCard;


