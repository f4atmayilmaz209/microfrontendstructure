'use client';

import { Layout, Menu, Badge, Button, Popover, Drawer } from 'antd';
import { ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React, { useState } from 'react';

import RemoteBasketWrapper from './RemoteBasketWrapper';
import { useCartStoreRaw } from '@/hooks/cartStore';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const {items} = useCartStoreRaw();
  const [cartVisible, setCartVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fff',
        boxShadow: '0 2px 8px #f0f1f2',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: '64px',
      }}
    >
      {/* Logo ve Menü */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link href="/" style={{ fontSize: 20, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShoppingCartOutlined style={{ fontSize: 20 }} />
          ShopNow
        </Link>

        {/* Masaüstü menüsü */}
        <div className="menu-desktop">
          <Menu mode="horizontal" selectable={false} style={{ borderBottom: 'none' }}>
            <Menu.Item key="home">
              <Link href="/">Ana Sayfa</Link>
            </Menu.Item>
            <Menu.Item key="products">
              <Link href="/products">Ürünler</Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link href="/about">Hakkımızda</Link>
            </Menu.Item>
          </Menu>
        </div>

        {/* Mobil menü butonu */}
        <div className="menu-mobile">
          <Button type="text" icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} />
        </div>
      </div>

      {/* Sepet */}
      <Popover
        content={<RemoteBasketWrapper />}
        title="Sepetiniz"
        trigger="click"
        open={cartVisible}
        onOpenChange={setCartVisible}
        placement="bottomRight"
      >
        <Badge count={totalItems} size="small">
          <Button
            type="text"
            icon={<ShoppingCartOutlined style={{ fontSize: 20 }} />}
          >
            Sepet
          </Button>
        </Badge>
      </Popover>

      {/* Drawer (mobil menü) */}
      <Drawer
        title="Menü"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu mode="vertical" selectable={false}>
          <Menu.Item key="home" onClick={() => setDrawerVisible(false)}>
            <Link href="/">Ana Sayfa</Link>
          </Menu.Item>
          <Menu.Item key="products" onClick={() => setDrawerVisible(false)}>
            <Link href="/products">Ürünler</Link>
          </Menu.Item>
          <Menu.Item key="about" onClick={() => setDrawerVisible(false)}>
            <Link href="/about">Hakkımızda</Link>
          </Menu.Item>
        </Menu>
      </Drawer>

      {/* Responsive CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          .menu-desktop {
            display: none;
          }
          .menu-mobile {
            display: block;
          }
        }
        @media (min-width: 769px) {
          .menu-desktop {
            display: block;
          }
          .menu-mobile {
            display: none;
          }
        }
      `}</style>
    </Header>
  );
};

export default Navbar;
