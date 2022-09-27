import './docs.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './components/Layout';
import { Container } from './components/Container';
import { useConfigConsumer } from './components/ConfigProvider';
import { Markdown } from './components/Markdown'

const docsPath = import.meta.env.VITE_DOCS_PATH
const env = import.meta.env.VITE_ENV

const Usage = () => {
  const [doc, setDoc] = useState<string | null>(null);

  const context = useConfigConsumer()
  const { locale } = context

  useEffect(() => {
    const task = async () => {

      const url = new URL(window.location.href);
      const title = url.searchParams.get('title');

      if (!title) {
        setDoc(`没有找到**${title ?? `相关文档`}**`);
        return;
      }
      const assetsPath = env === 'production' ? '':'/assets'
      const res = await fetch(`${docsPath}${assetsPath}/docs-${locale}/${title}.md`)
      const text = await res.text()
      setDoc(text);

      document.title = `${title}-零界`
    };
    task();

  }, [locale]);


  return (
    <section className="text-gray-600 body-font lg:w-[70%] mx-auto w-full">
      {doc !== null && (
        <Markdown>{doc}</Markdown>
      )}
    </section>
  );
}

export const App = () => {
  return (
    <Layout>
      <Container>
        <Usage />
      </Container>
    </Layout>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
