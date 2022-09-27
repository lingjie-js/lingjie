import './docs.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Layout } from './components/Layout';
import { Container } from './components/Container';
import { useTranslation } from "react-i18next";
import '../react-i18next/i18n'
import logo from './image/logo_white.png';

const docsPath = import.meta.env.VITE_DOCS_PATH

const Home = () => {
  const { t, i18n } = useTranslation();
  return <>
    <div className="flex flex-col text-center w-full mb-10">
      <h2 className="text-xs text-pink-500 tracking-widest font-medium title-font mb-1 flex justify-center">
        <img
          className="h-40 rounded object-cover object-center mb-6 bg-pink-500"
          src={logo}
          alt="lingjie logo"
        />
      </h2>
      <h1 className="sm:text-3xl text-2xl title-font mb-4 text-pink-500 font-bold">
        {t('index.title')}
      </h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
        {t('index.subtitle')}
      </p>
      <div className="flex mt-6 justify-center">
        <div className="w-16 h-1 rounded-full bg-pink-500 inline-flex"></div>
      </div>
    </div>

    <div className="flex flex-col lg:flex-row flex-wrap">
      <Card
        title={t('index.card.1.title')}
        description={t('index.card.1.description')}
      />
      <Card
        title={t('index.card.2.title')}
        description={t('index.card.2.description')}
      />
      <Card
        title={t('index.card.3.title')}
        description={t('index.card.3.description')}
      />
      <Card
        title={t('index.card.4.title')}
        description={t('index.card.4.description')}
      />
      <Card
        title={t('index.card.5.title')}
        description={t('index.card.5.description')}
      />
      <Card
        title={t('index.card.6.title')}
        description={t('index.card.6.description')}
      />
    </div>
    <a href={`${docsPath}/docs/quick-start.html`} className='flex mt-16'>
      <Button>{t('index.button')}</Button>
    </a>
  </>
}

export const App = () => {
  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <Container>
          <Home />
        </Container>
      </section>
    </Layout>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));
