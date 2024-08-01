'use client';

import { IoCalendarOutline } from 'react-icons/io5';
import { RiHome3Line } from 'react-icons/ri';
import { AiOutlineMessage } from 'react-icons/ai';
import { BsFillPlusCircleFill, BsPersonCircle } from 'react-icons/bs';
import Link from 'next/link';
import useAuthStore from '@/zustand/bearsStore';
import { useMyPageStore } from '@/zustand/mypageStore';
import { usePathname, useRouter } from 'next/navigation';

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const setSelectedComponent = useMyPageStore((state) => state.setSelectedComponent);

  const handleReservationsClick = () => {
    if (!user) {
      alert('로그인이 필요한 서비스입니다!!');
      router.push('/login');
      return;
    }
    setSelectedComponent('Reservations');
    router.push(`/${user?.id}/mypage`);
  };

  const handlePostClick = () => {
    if (!user) {
      alert('로그인이 필요한 서비스입니다!!');
      router.push('/login');
      return;
    }
    router.push(`/postpage`);
  };

  const handleMypageClick = () => {
    if (!user) {
      alert('로그인이 필요한 서비스입니다!!');
      router.push('/login');
      return;
    }
    setSelectedComponent('likes');
    router.push(`/${user?.id}/mypage`);
  };

  const handleMessagesClick = () => {
    if (!user) {
      alert('로그인이 필요한 서비스입니다!!');
      router.push('/login');
      return;
    }
    router.push(`/${user?.id}/chatlistpage`);
  };

  // 특정 경로에서 Navbar를 숨기기
  const excludedRoutes = ['/login', '/postpage'];
  if (excludedRoutes.includes(pathname) || pathname.startsWith('/detail')) {
    return null;
  }

  return (
    <nav className="text-grayscale-500 border-grayscale-100 flex border-t">
      <div className="container mx-auto flex items-center justify-between p-8">
        <Link href="/">
          <div className="hover:text-primary-300 flex flex-col items-center space-y-2">
            <RiHome3Line size={24} />
            <span className="text-[10px]">Home</span>
          </div>
        </Link>
        <div
          onClick={handleReservationsClick}
          className="hover:text-primary-300 flex cursor-pointer flex-col items-center space-y-2"
        >
          <IoCalendarOutline size={24} />
          <span className="text-[10px]">Reservations</span>
        </div>
        <div
          onClick={handlePostClick}
          className="flex flex-col items-center rounded-full shadow-[0px_8px_19px_rgba(0,0,0,0.17)]"
        >
          <BsFillPlusCircleFill size={50} className="text-primary-300" />
        </div>
        <div
          onClick={handleMessagesClick}
          className="hover:text-primary-300 flex cursor-pointer flex-col items-center space-y-2"
        >
          <AiOutlineMessage size={24} />
          <span className="text-[10px]">Messages</span>
        </div>
        <div
          onClick={handleMypageClick}
          className="hover:text-primary-300 flex cursor-pointer flex-col items-center space-y-2"
        >
          <BsPersonCircle size={24} />
          <span className="text-[10px]">Mypage</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
