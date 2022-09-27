import './docs.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './components/Layout';
import { Button } from './components/Button';
import { Container } from './components/Container';
import { Markdown } from './components/Markdown';
import '../react-i18next/i18n'
import { Trans, useTranslation } from 'react-i18next';

const docsPath = import.meta.env.VITE_DOCS_PATH

export const QuickStart = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <h1 className="text-center sm:text-3xl text-2xl title-font mb-4 text-pink-500 font-bold">
        {t('quick-start.title')}
      </h1>
      <section className="text-gray-600 body-font">
        <div className="container px-5 lg:px-20 pt-12 mx-auto">
          <Step
            index={1}
            title={t('quick-start.step.1.title')}
            description={
              <>
                <Markdown>
                  {`\`\`\`bash
mkdir micro-frontend`}
                </Markdown>
                <Markdown>
                  {`\`\`\`bash
cd ./micro-frontend`}
                </Markdown>
              </>
            }
          />

          <Step
            index={2}
            title={t('quick-start.step.2.title')}
            description={
              <>
                <Markdown>
                  {`> ${t('quick-start.step.2.markdown.blockquote.create-lingjie-shell')}`}
                </Markdown>
                {t('quick-start.step.2.create-lingjie-folder')}
                <Markdown>
                  {`\`\`\`bash
mkdir lingjie`}
                </Markdown>
                <Markdown>
                  {`\`\`\`bash
cd ./lingjie`}
                </Markdown>
                {t('quick-start.step.2.create-entry-file')}
                <Markdown>
                  {`\`\`\`bash
touch index.html`}
                </Markdown>
                <Trans i18nKey={'quick-start.step.2.import-lingjie-shell'}>
                  <HightLight>ignore</HightLight>
                  <HightLight>ignore</HightLight>
                  <a
                    href={`${docsPath}/docs/usage.html?title=lingjie-shell-and-lingjie-page`}
                    className="text-pink-500 font-bold"
                  >
                    ignore
                  </a>
                </Trans>
                <Markdown>
                  {`\`\`\`html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lingjie Microapp Shell</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
  </style>
</head>

<body>
  ${t('quick-start.step.2.markdown.code.lingjie-rules')}
  <script>
    window.__lingjie_shell_config__ = {
      rules: [
        {
          "test": "/demo(/.+)?",
          "timeout": 5000,
          "backAction": "reload",
          "disabled": false
        }
      ]
    }
  </script>
  ${t('quick-start.step.2.markdown.code.import-shell-script')}
  <script src="https://unpkg.com/lingjie@1.0.0/dist/shell/lingjie-shell.umd.js"></script>
</body>

</html>
                      `}
                </Markdown>
              </>
            }
          />

          <Step
            index={3}
            title={t('quick-start.step.3.title')}
            description={
              <>
                <Markdown>
                  {`> ${t('quick-start.step.3.markdown.blockquote.create-lingjie-page')}`}
                </Markdown>
                {t('quick-start.step.3.one-level-up')}
                <Markdown>
                  {`\`\`\`bash
cd ..`}
                </Markdown>
                {t('quick-start.step.3.create-demo-folder')}
                <Markdown>
                  {`\`\`\`bash
mkdir demo`}
                </Markdown>
                <Markdown>
                  {`\`\`\`bash
cd ./demo`}
                </Markdown>
                {t('quick-start.step.3.create-demo-files')}
                <Markdown>
                  {`\`\`\`bash
touch index.html projectA.html projectB.html`}
                </Markdown>
                <Trans i18nKey={'quick-start.step.3.import-lingjie-page'}>
                  <HightLight>ignore</HightLight><HightLight>ignore</HightLight>
                </Trans>
                <Markdown>
                  {`\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${t('quick-start.step.3.markdown.code.modify-title')}
  <title>index</title>
  ${t('quick-start.step.3.markdown.code.import-lingjie-page')}
  <script src="https://unpkg.com/lingjie@1.0.0/dist/page/lingjie-page.umd.js"></script>
</head>
<body>
  <li>
    <a href="/demo/index.html">go to index</a>
  </li>
  <li>
    <a href="/demo/projectA.html">go to project A</a>
  </li>
  <li>
    <a href="/demo/projectB.html">go to project B</a>
  </li>
  ${t('quick-start.step.3.markdown.code.modify-content')}
  <h1>This is index page</h1>
</body>
</html>`}
                </Markdown>
              </>
            }
          />

          <Step
            index={4}
            title={t('quick-start.step.4.title')}
            description={
              <Markdown>
                {`\`\`\`bash
micro-frontend
  |-demo
    |-index.html
    |-projectA.html
    |-projectB.html
  |-lingjie
    |-index.html`}
              </Markdown>
            }
          />

          <Step
            index={5}
            title={t('quick-start.step.5.title')}
            description={
              <>
                {t('quick-start.step.5.install-npx')}
                <Markdown>
                  {`\`\`\`bash
npm install -g npx`}
                </Markdown>
                {t('quick-start.step.5.start-local-server')}
                <Markdown>
                  {`\`\`\`bash
npx http-server -p 8080`}
                </Markdown>
                <Trans i18nKey={'quick-start.step.5.instruction'}>
                  <HightLight>ignore</HightLight><HightLight>ignore</HightLight>
                </Trans>
              </>
            }
          />
        </div>
      </section>
      <a href={`${docsPath}/docs/usage-index.html`} className="py-12 flex">
        <Button>{t('quick-start.step.5.more')}</Button>
      </a>
    </>
  );
};

type StepProps = {
  index: number;
  title: React.ReactNode;
  description: React.ReactNode;
};

const Step = (props: StepProps) => {
  return (
    <div className="relative pt-10 pb-20 sm:items-center md:w-[2/3] ml-0">
      <div className="h-full w-6 sm:w-10 absolute inset-0 flex items-center justify-center">
        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div className="flex-shrink-0 w-6 h-6 sm:w-10 sm:h-10 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-pink-500 text-white relative z-10 title-font font-medium text-sm sm:text-xl">
        {props.index}
      </div>
      <div className="flex-grow md:pl-8 pl-6 sm:items-center items-start flex-col sm:flex-row">

        <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 className="title-font text-gray-700 mb-1 text-xl font-bold">
            {props.title}
          </h2>
          <div className="leading-relaxed">{props.description}</div>
        </div>
      </div>
    </div>
  );
};

type HightLightProps = {
  children: React.ReactNode
}
const HightLight = (props: HightLightProps) => {
  return <span className="bg-pink-400 text-slate-50 mx-1 px-2 py-1">{props.children}</span>
}


export const App = () => {
  return <Layout>
    <Container>
      <QuickStart />
    </Container>
  </Layout>
}

ReactDOM.render(<App />, document.getElementById('root'));
