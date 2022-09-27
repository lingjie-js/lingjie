import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconLogo } from './IconLogo';

export const Footer = () => {
  const { t, i18n } = useTranslation()
  return (
    <footer className="text-gray-600 body-font bg-gray-100">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <IconLogo />
          <span className="ml-3 text-xl text-pink-500 font-bold">{t('footer.lingjie')}</span>
        </a>
        <p className="text-sm text-gray-500 text-center sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          MIT Licensed | Copyright © 2021-present Lingjie Team
        </p>
        <span className="inline-flex text-center sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          {t('footer.description')}
        </span>
      </div>
    </footer>
  );
};
