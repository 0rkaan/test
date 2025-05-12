import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="bg-gray-100 text-sm min-h-screen flex flex-col">
      <Navbar />

      <div className="flex pt-28 flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
