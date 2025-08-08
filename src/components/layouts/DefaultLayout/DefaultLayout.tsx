import { ReactNode } from 'react';
import { Header } from '../../widgets';

type DefaultLayoutProps = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
