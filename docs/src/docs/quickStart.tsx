import './docs.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './components/Layout';
import { Button } from './components/Button';
import { Container } from './components/Container';
import { Markdown } from './components/Markdown';
import '../react-i18next/i18n'
import { useTranslation } from 'react-i18next';
import { useConfigConsumer } from './components/ConfigProvider';

const docsPath = import.meta.env.VITE_DOCS_PATH
const env = import.meta.env.VITE_ENV

export const QuickStart = () => {
  const { t, i18n } = useTranslation();
  const [doc, setDoc] = useState<string | null>(null);
  const context = useConfigConsumer()

  const { locale } = context

  useEffect(() => {
    const task = async () => {
      const assetsPath = env === 'production' ? '' : '/assets'
      const res = await fetch(`${docsPath}${assetsPath}/docs-${locale}/quick-start.md`)
      const text = await res.text()
      setDoc(text);
    };
    task();
  }, [locale]);

  return <>
    <h1 className="text-center sm:text-3xl text-2xl title-font mb-4 text-pink-500 font-bold">
      {t('quick-start.title')}
    </h1>
    <div className="text-gray-600 body-font lg:w-[70%] mx-auto w-full">
      {doc !== null && (
        <Markdown>{doc}</Markdown>
      )}
    </div>
    <a href={`${docsPath}/docs/usage-index.html`} className="py-12 flex">
      <Button>{t('quick-start.more')}</Button>
    </a>
  </>
};

export const App = () => {
  return <Layout>
    <Container>
      <QuickStart />
    </Container>
  </Layout>
}

ReactDOM.render(<App />, document.getElementById('root'));
