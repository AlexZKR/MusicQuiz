import type { ReactNode } from 'react';
import Header from '../organisms/havbar/Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-primary flex min-h-screen flex-col transition-colors">
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
