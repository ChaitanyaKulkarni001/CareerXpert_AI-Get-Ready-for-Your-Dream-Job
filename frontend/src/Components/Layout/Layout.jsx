import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
