import React from 'react';

export const Card = (props: CardProps) => {
  return (
    <div className="xl:w-[32%] lg:w-[49%] md:w-full box-border px-8 py-6 border-opacity-60 mt-1 mb-1 lg:mr-1 lg:ml-1 bg-gray-100 rounded-lg border-2 border-dashed border-pink-500">
      <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-pink-500 text-white flex-shrink-0">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        {props.title}
      </h2>
      <p className="leading-relaxed text-base mb-4">{props.description}</p>
    </div>
  );
};
type CardProps = {
  title: string;
  description: string;
};
