import './docs.css';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './components/Layout';
import { useConfigConsumer } from './components/ConfigProvider'
import { Container } from './components/Container';
import { useTranslation } from 'react-i18next';

type Doc = {
  title: string
}

type Docs = {
  list: Doc[]
}

const docsPath = import.meta.env.VITE_DOCS_PATH
const env = import.meta.env.VITE_ENV

const UsaegIndex = () => {
  const [docs, setDocs] = React.useState<Docs | null>(null);
  const { t, i18n } = useTranslation();
  const context = useConfigConsumer()
  const { locale } = context

  useEffect(() => {
    const task = async () => {
      const assetsPath = env === 'production' ? '':'/assets'
      const res = await fetch(`${docsPath}${assetsPath}/docs-${locale}.json`)
      const json = await res.json()
      setDocs(json);
    };
    task();

  }, [locale]);

  return <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="text-center mb-20">
        <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
          {t('usage-index.title')}
        </h1>
        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
          {t('usage-index.subtitle')}
        </p>
      </div>
      <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
        {docs &&
          docs.list.map((doc) => {
            const href = `${docsPath}/docs/usage.html?title=${encodeURIComponent(
              doc.title
            )}`

            return (
              <UsageLinkItem
                key={doc.title}
                href={href}
              >
                {t(doc.title)}
              </UsageLinkItem>
            );
          })}
      </div>
    </div>
  </section>
}

type UsageLinkItemProps = {
  href: string;
  children: React.ReactNode;
};

const UsageLinkItem = (props: UsageLinkItemProps) => {
  return (
    <a href={props.href} className=" block p-2 sm:w-1/2 w-full">
      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          className="text-pink-500 w-6 h-6 flex-shrink-0 mr-4"
          viewBox="0 0 24 24"
        >
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
          <path d="M22 4L12 14.01l-3-3"></path>
        </svg>
        <span className="title-font font-medium">{props.children}</span>
      </div>
    </a>
  );
};

export const App = () => {
  return (
    <Layout>
      <Container>
        <UsaegIndex />
      </Container>
    </Layout>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
