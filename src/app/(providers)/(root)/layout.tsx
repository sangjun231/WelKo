import UpButton from '@/components/common/Button/UpButton';
import Navbar from '@/components/common/Navbar/Navbar';
import { PropsWithChildren, Suspense } from 'react';
import RouteChangeHandler from './(mainpage)/_components/RouteChangeHandler';

function RootLayout({ children }: PropsWithChildren) {
  return (
    <div id="root" className="web:max-w-[1440px] mx-auto flex min-h-screen max-w-[360px] flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <RouteChangeHandler />
      </Suspense>
      <div className="relative flex-1 gap-4">
        <main>{children}</main>
        <div className="absolute z-20">
          <UpButton />
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default RootLayout;
