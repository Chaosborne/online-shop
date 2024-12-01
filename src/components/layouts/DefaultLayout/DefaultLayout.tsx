import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../widgets';

type DefaultLayoutProps = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const location = useLocation();
  const showHeader = location.pathname != '/';

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
}
// Обертка над сайтом