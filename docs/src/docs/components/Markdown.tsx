import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

import tomorrow from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('ts', typescript)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('jsx', jsx)

export type MarkdownProps = {
  children: string;
};

const docsPath = import.meta.env.VITE_DOCS_PATH

export const Markdown = (props: MarkdownProps) => {
  const { t, i18n } = useTranslation();

  return (
    <ReactMarkdown
      components={{
        a: ({ children, node, className, ...props }) => {
          let { href, ...restProps } = props
          href = docsPath + href
          return (
            <a className="text-pink-500 md:mb-2 lg:mb-0" href={href} {...restProps}>
              {children}
            </a>
          );
        },
        h1: ({ children }) => {
          return (
            <div className=" text-2xl leading-relaxed mb-4">{children}</div>
          );
        },
        h2: ({ children }) => {
          return (
            <div className=" text-xl leading-relaxed mb-3">{children}</div>
          );
        },
        h3: ({ children }) => {
          return (
            <div className=" text-lg leading-relaxed mb-3">{children}</div>
          );
        },
        h4: ({ children }) => {
          return (
            <div className=" text-base leading-relaxed mb-3">{children}</div>
          );
        },
        p: ({ children }) => {
          return (
            <div className="text-base leading-relaxed mb-2">{children}</div>
          );
        },
        img:({ children, node, className, ...props })=>{
          return (
            <img className='lg:w-[90%] xl:w-[70%] m-auto' {...props}></img>
          )
        },
        ul: ({ children }) => {
          return (
            <div className="text-base leading-relaxed my-4">{children}</div>
          );
        },
        li: ({ children, index, ordered }) => {
          return (
            <div className="flex flex-col sm:items-start sm:text-left mb-1 space-y-2.5">
              <div>
                {
                  ordered
                    ?
                    <span className="bg-pink-200 text-pink-500 w-5 h-5 mr-2 rounded-full inline-flex items-center justify-center">
                      {index + 1}
                    </span>
                    :
                    <span className="bg-pink-100 text-pink-500 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                }
                {children}
              </div>
            </div>
          );
        },
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');

          const text = Array.isArray(children) ? children.join('\n') : children + '';

          return !inline && match ? (
            <div className="text-base leading-relaxed mb-1">
              <SyntaxHighlighter
                children={text.replace(/\n$/, '')}
                style={tomorrow}
                language={match[1]}
                PreTag="div"
                {...(props as any)}
              />
            </div>
          ) : (
            <span className="bg-pink-100" {...props}>
              {children}
            </span>
          );
        },
        blockquote: ({ children }) => {
          return <div className='pl-4 border-l-4 border-pink-500 border-solid'>
            {children}
          </div>
        },
        // change the h5 element to previous page component
        h5: ({ children }) => {
          return <div className='my-2 mb-6 xs:inline-block'>
            <p>{t('markdown.previous')}</p>
            {children}
          </div>
        },
        // change the h6 element to next page component
        h6: ({ children }) => {
          return <div className='mt-2 mb-6 xs:float-right '>
            <p>{t('markdown.next')}</p>
            {children}
          </div>
        },
      }}
    >
      {props.children}
    </ReactMarkdown>
  );
};

export default Markdown;
