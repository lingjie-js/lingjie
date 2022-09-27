import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { ConfigProvider } from './ConfigProvider'

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ConfigProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ConfigProvider>
  );
};
