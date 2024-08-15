'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { formatRelativeDate } from '@/utils/detail/functions';
import { API_MYPAGE_REVIEWS, API_POST, API_MYPAGE_PROFILE } from '@/utils/apiConstants';
import { Tables } from '@/types/supabase';
import { formatDateRange } from '@/utils/detail/functions';

const ReviewList = ({ userId }: { userId: string }) => {
  const [reviews, setReviews] = useState<Tables<'reviews'>[]>([]);
  const [profile, setProfile] = useState<Tables<'users'>>();
  const router = useRouter();

  const fetchReviews = async () => {
    const response = await axios.get(API_MYPAGE_REVIEWS(userId));
    setReviews(response.data);
  };

  const fetchProfile = async () => {
    const response = await axios.get(API_MYPAGE_PROFILE(userId));
    const profileData = response.data;
    setProfile(profileData);
  };

  const getPostsData = async () => {
    try {
      const response = await axios.get(API_POST());
      const data: Tables<'posts'>[] = response.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP error! status: ${error.response?.status}`);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  };

  const {
    data: posts,
    isPending,
    error
  } = useQuery<Tables<'posts'>[]>({
    queryKey: ['post', userId],
    queryFn: getPostsData,
    enabled: !!userId
  });

  const handleEditReview = (id: string, postId: string) => {
    router.push(`/${userId}/reviewpage?id=${id}&post_id=${postId}`);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(API_MYPAGE_REVIEWS(userId), { data: { id } });
    setReviews(reviews.filter((review) => review.id !== id));
  };

  useEffect(() => {
    fetchReviews();
    fetchProfile();
  }, [userId]);

  if (isPending) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  if (error) {
    return <div className="flex h-screen items-center justify-center">Error: {error.message}</div>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-[8px]">
          <Image src="/icons/tabler-icon-pencil.svg" alt="no review" width={44} height={44} />
          <p className="text-[14px] font-semibold text-grayscale-900">You don&apos;t have any Review</p>
          <p className="text-[12px] text-grayscale-600">When you write a new review,</p>
          <p className="text-[12px] text-grayscale-600">it will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post, index) => {
        const review = reviews.find((r) => r.post_id === post.id);

        return (
          review && (
            <div key={`${post.id}-${index}`} className="mb-[20px] web:mb-[20px]">
              <div className="flex">
                <Image
                  className="h-[44px] w-[44px] rounded-[8px] web:h-[120px] web:w-[120px] web:rounded-[12px]"
                  src={post.image ?? '/icons/upload.png'}
                  alt={post.title ?? 'Default title'}
                  width={44}
                  height={44}
                />
                <div className="ml-[8px] flex w-full flex-col gap-[4px] web:ml-[16px] web:gap-[8px]">
                  <p className="line-clamp-1 text-[14px] font-semibold text-primary-900 web:text-[21px]">
                    {post.title}
                  </p>
                  <p className="text-[14px] text-grayscale-500 web:text-[18px]">
                    {formatDateRange(post.startDate, post.endDate)}
                  </p>
                </div>
              </div>
              <div className="my-[16px] w-full items-start rounded-[16px] border bg-grayscale-50 p-[16px] web:my-[32px] web:p-[24px]">
                <div className="flex items-center gap-[8px] web:gap-[16px]">
                  <Image
                    src="/icons/tabler-icon-star-filled.svg"
                    alt="Star"
                    width={16}
                    height={16}
                    style={{ width: '16px', height: '16px' }}
                  />
                  <p className="text-[14px] font-semibold text-grayscale-900 web:text-[21px]">{review.rating ?? 0}</p>
                  <p className="text-[13px] font-medium web:text-[21px]">{profile?.name}</p>
                  <p className="text-[13px] text-grayscale-700 web:text-[14px]">
                    {formatRelativeDate(review.created_at)}
                  </p>
                </div>
                <p className="mt-[12px] break-words text-[14px] text-grayscale-700 web:mt-[16px] web:text-[18px]">
                  {review.content}
                </p>
              </div>
              <div className="flex justify-end gap-[16px] web:gap-[40px]">
                <button
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#F7F7F9] web:h-[44px] web:w-[44px]"
                  onClick={() => {
                    handleEditReview(review.id, post.id);
                  }}
                >
                  <Image
                    className="web:h-[33px] web:w-[33px]"
                    src="/icons/tabler-icon-pencil.svg"
                    alt="Edit Review"
                    width={24}
                    height={24}
                  />
                </button>
                <button
                  className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#F7F7F9] web:h-[44px] web:w-[44px]"
                  onClick={() => {
                    handleDelete(review.id);
                  }}
                >
                  <Image
                    className="web:h-[33px] web:w-[33px]"
                    src="/icons/tabler-icon-trash.svg"
                    alt="Delete Review"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default ReviewList;
