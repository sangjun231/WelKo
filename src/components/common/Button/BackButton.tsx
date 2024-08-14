import React, { useEffect } from 'react';
import BackBtn from '/public/icons/tabler-icon-back.svg';
import { useWebStore } from '@/zustand/webStateStore';

interface BackButtonProps {
  className?: string;
}

const BackButton = ({ className }: BackButtonProps) => {
  const { isWeb, setIsWeb } = useWebStore();

  // 화면 크기에 따라 isWeb 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      setIsWeb(window.innerWidth >= 768);
    };

    handleResize(); // 초기 로드 시 한 번 실행
    window.addEventListener('resize', handleResize); // 화면 크기 변경 시마다 실행

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsWeb]);

  return (
    <div className={`icon-button ${className}`}>
      <button onClick={() => window.history.back()} className="flex h-full w-full items-center justify-center">
        <BackBtn width={isWeb ? 44 : 24} height={isWeb ? 44 : 24} />
      </button>
    </div>
  );
};

export default BackButton;
