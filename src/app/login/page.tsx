'use client';
import { googleLogin, handleLogin, handleSignUp } from '@/utils/supabase/service';
import useAuthStore from '@/zustand/bearsStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const onLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await login(email, password, router);
  };

  const onSignUp = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSignUp(email, password, name, router, setError);
  };

  const goToFindPassword = () => {
    router.push('/findPassword');
  };

  const onGoogleLogin = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    await googleLogin();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center md:h-screen md:bg-gray-100">
      <div className="h-[800px] w-[360px] max-w-md bg-white p-6 md:w-full md:rounded-lg md:shadow-lg">
        <h1 className="text-center text-2xl font-bold">{isSignUp ? 'Create account' : 'Sign in now'}</h1>
        <span className="mb-8 mt-3 block text-center text-sm text-gray-500">
          {isSignUp ? 'Please sign up to continue Welko' : 'Please sign in to continue Welko'}
        </span>
        {isSignUp && <p className="mb-2">Email</p>}
        <input
          type="email"
          placeholder="example@google.com"
          className="mb-3 h-12 w-full rounded-xl bg-[#F7F7F9] p-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {isSignUp && <p className="mb-2">Password</p>}
        <div className="relative mb-3 w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="h-12 w-full rounded-xl bg-[#F7F7F9] p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
            onClick={toggleShowPassword}
          >
            <Image
              src={showPassword ? '/icons/tabler-icon-eye-off.svg' : '/icons/tabler-icon-eye.svg'}
              alt={showPassword ? 'Hide password' : 'Show password'}
              width={20}
              height={20}
            />
          </span>
        </div>
        {isSignUp && (
          <div>
            <p className="mb-2">Nickname</p>
            <input
              type="text"
              placeholder="Nickname"
              className="mb-3 h-12 w-full rounded-xl bg-[#F7F7F9] p-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <button
          onClick={isSignUp ? onSignUp : onLogin}
          className="w-full rounded-xl bg-[#B95FAB] px-5 py-3 text-white hover:bg-[#b344a2]"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>

        <div className="absolute bottom-[100px] left-0 w-full text-center">
          <p className="mt-[58px] text-center">
            {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}{' '}
            <button onClick={toggleForm} className="text-[#FF7029] underline">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>

          {!isSignUp && (
            <p className="absolute mt-4 w-full text-center">
              <button onClick={goToFindPassword} className="text-[#FF7029] underline">
                Forgot Password?
              </button>
            </p>
          )}

          <div className="my-4 mt-[77px] flex justify-center">
            <a href="#" onClick={onGoogleLogin} className="mx-1 p-2">
              <Image
                src="https://supabase.com/dashboard/img/icons/google-icon.svg"
                alt="Google logo"
                width={24}
                height={24}
                className="h-[37px] w-[37px]"
              />
            </a>
            <a href="#" className="mx-1 rounded-full border border-gray-300 p-2">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="mx-1 rounded-full border border-gray-300 p-2">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
