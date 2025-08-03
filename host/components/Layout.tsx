// components/Layout.tsx
import React from 'react';
import { Layout as AntLayout } from 'antd';
import Navbar from './Navbar';

const { Content, Footer } = AntLayout;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content style={{ padding: '24px', backgroundColor: '#fff' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} ShopNow
      </Footer>
    </AntLayout>
  );
};

export default Layout;
