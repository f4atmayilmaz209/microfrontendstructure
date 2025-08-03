'use client';

import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Typography, Spin, Alert } from 'antd';
import ProductCard from '@/components/ProductCard';

import { fetchProducts,Product } from '@/pages/api/product';
const { Header, Content } = Layout;
const { Title } = Typography;


const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Header style={{ background: '#fff', padding: '0 2rem' }}>
        <Title level={3} style={{ margin: 0 }}>
          🛍️ Ürün Listesi
        </Title>
      </Header>

      <Content style={{ padding: '2rem' }}>
        {loading && <Spin tip="Ürünler yükleniyor..." />}
        {error && <Alert message="Hata" description={error} type="error" showIcon />}
        <Row gutter={[24, 24]} justify="start">
          {products.map(product => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default HomePage;
