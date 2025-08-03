'use client';

import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Typography, Spin, Alert, Space } from 'antd';
import ProductCard from '@/components/ProductCard';
import { fetchProducts, Product } from '@/pages/api/product';

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
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          backgroundColor: '#001529',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          boxShadow: '0 2px 8px #f0f1f2',
        }}
      >
        <Title level={3} style={{ color: '#fff', margin: 0 }}>
          🛍️ Ürün Listesi
        </Title>
      </Header>

      <Content style={{ padding: '24px 50px', backgroundColor: '#f0f2f5', flexGrow: 1 }}>
        {loading && (
          <Space direction="vertical" size="middle" style={{ width: '100%', textAlign: 'center', marginTop: 80 }}>
            <Spin size="large" tip="Ürünler yükleniyor..." />
          </Space>
        )}

        {error && (
          <Alert
            message="Hata"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        {!loading && !error && (
          <Row gutter={[24, 24]} justify="start">
            {products.map(product => (
              <Col
                key={product.id}
                xs={24}   // mobil 1 sütun
                sm={12}   // küçük ekran 2 sütun
                md={8}    // orta ekran 3 sütun
                lg={6}    // büyük ekran 4 sütun
                xl={6}    // ekstra büyük ekran da 4 sütun
              >
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default HomePage;
