import Logo from '@/components/layouts/Logo';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5  ">
      {/* Logo with smooth animation */}
      <div className="animate-bounce">
        <Logo />
      </div>

      {/* Loading text */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-700 animate-pulse">
        Loading...
      </h2>

      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Extra small text */}
      <p className="text-gray-500 text-sm">
        Please wait a moment
      </p>

    </div>
  );
};

export default Loading;