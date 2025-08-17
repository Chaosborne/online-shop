import { ReactNode } from 'react';
import { Header, Footer } from '../../widgets';
import s from './DefaultLayout.module.scss';

type DefaultLayoutProps = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={s.layout}>
      <Header />
      <main className={s.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
