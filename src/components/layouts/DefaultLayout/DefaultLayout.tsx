import { ReactNode } from 'react';
import { Header, Footer } from '../../widgets';

type DefaultLayoutProps = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
