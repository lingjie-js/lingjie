import React from 'react';
import { IconLogo } from './IconLogo';
import { useConfigConsumer } from './ConfigProvider';

import '../../react-i18next/i18n';
import { useTranslation } from 'react-i18next';

const docsPath = import.meta.env.VITE_DOCS_PATH

export const Header = () => {

  const { t, i18n } = useTranslation()

  const context = useConfigConsumer()
  const { locale, updateLocale } = context

  const changeLocale = () => {
    const newLocale = locale === 'en' ? 'zh' : 'en'
    updateLocale(newLocale)
  }

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          href={`${docsPath}/docs/index.html`}>
          <IconLogo />
          <span className="ml-3 text-xl text-pink-500 font-bold">{t('header.lingjie')}</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <MenuLink href={`${docsPath}/docs/index.html`}>{t('header.home')}</MenuLink>
          <MenuLink href={`${docsPath}/docs/quick-start.html`}>{t('header.quick-start')}</MenuLink>
          <MenuLink href={`${docsPath}/docs/usage-index.html`}>{t('header.more')}</MenuLink>
          <span className='mr-5 px-2 border border-gray-300 cursor-pointer' onClick={changeLocale}>
            {locale === 'en' ? '中文' : 'English'}
          </span>
        </nav>
        <a className='flex cursor-pointer items-center gap-1' href='https://github.com/lingjie-js/lingjie' target="_blank">
          GitHub
          <IconExternalLink />
        </a>
      </div>
    </header>
  );
};

type MenuLinkProps = {
  href: string;
  children: React.ReactNode;
};

const MenuLink = (props: MenuLinkProps) => {
  return (
    <a className="mr-5 hover:text-gray-900" href={props.href}>
      {props.children}
    </a>
  );
};

const IconExternalLink = () => {
  return <svg
    className="w-4 h-4 inline"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
  </svg>
}