import { ReactNode } from 'react';
import { ShopHeader } from '../../widgets';

type DefaultLayoutProps = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <ShopHeader />
      {children}
    </>
  );
}
