/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import { Card, Button, Typography, Empty, Space, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useCartStore } from "host/cartStore";
/*
  ✅ Responsive Özeti:

  - Sabit resim boyutları (56x56px) ile tutarlı görünüm sağlandı, taşmalar önlendi.
  - `flex` ve `gap` kullanımıyla öğeler yatayda hizalandı, dar ekranlarda da bozulmadı.
  - `flex-grow` ve `min-w-0` sayesinde metin alanı esnek hale geldi, taşma olmadı.
  - Uzun başlıklar için `ellipsis` ile kırpma ve `Tooltip` ile tam metni gösterme eklendi.
  - Fiyat ve silme butonu `flex-col items-end` ile sağ tarafa hizalandı.
  - Sepet kutusunun yüksekliği sınırlandı (`maxHeight: 60vh`) ve overflow ile scroll sağlandı.
  - Tailwind + Ant Design kombinasyonu ile ekran boyutlarına uyumlu, şık ve sade bir sepet görünümü elde edildi.
*/
interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

const { Text, Paragraph } = Typography;

const Basket = () => {
  const items = useCartStore((state: { items: any }) => state.items) as CartItem[];
  const removeFromCart = useCartStore((state: { removeFromCart: any }) => state.removeFromCart);
  const clearCart = useCartStore((state: { clearCart: any }) => state.clearCart);

  if (items.length === 0)
    return (
      <div className="flex justify-center mt-20">
        <Empty description="Sepetiniz boş" />
      </div>
    );

  return (
    <Card
      title={<Text strong style={{ fontSize: 20 }}>🛒 Sepetiniz</Text>}
      className="max-w-md mx-auto"
      style={{ borderRadius: 12 }}
      bodyStyle={{ padding: 16, maxHeight: "60vh", overflowY: "auto" }}
      bordered
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {items.map(({ id, title, image, price, quantity }) => (
          <div
            key={id}
            className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <div
              className="relative rounded overflow-hidden bg-gray-100 flex-shrink-0"
              style={{ width: 56, height: 56 }}
            >
              <Image
                src={image}
                alt={title}
                width={56}
                height={56}
                style={{ objectFit: "contain" }}
                priority={false}
              />
            </div>

            <div className="flex flex-col flex-grow min-w-0">
              <Tooltip title={title}>
                <Text strong ellipsis className="mb-0">
                  {title}
                </Text>
              </Tooltip>

              <Paragraph type="secondary" className="mb-0 text-sm">
                Adet: {quantity}
              </Paragraph>
            </div>

            <div className="flex flex-col items-end min-w-[85px]">
              <Text strong style={{ fontSize: 16 }}>
                {(price * quantity).toFixed(2)} ₺
              </Text>

              <Button
                type="text"
                danger
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => removeFromCart(id)}
                aria-label={`Remove ${title} from cart`}
              />
            </div>
          </div>
        ))}
      </Space>

      <Button
        type="primary"
        danger
        block
        size="large"
        onClick={clearCart}
        style={{ marginTop: 24, fontWeight: 600, borderRadius: 8 }}
      >
        Sepeti Temizle
      </Button>
    </Card>
  );
};

export default Basket;
