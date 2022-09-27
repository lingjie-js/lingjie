import React from 'react';
import logoIcon from '../image/logo_icon.png'

export const IconLogo = () => {
  return (
    <img
        src={logoIcon}
        alt="logo"
        id="logo"
        className="w-10 h-10 text-white bg-pink-500 rounded-full"
      />
  );
};
