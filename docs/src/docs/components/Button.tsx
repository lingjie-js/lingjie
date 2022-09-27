import React from 'react';

export const Button = (props: ButtonProps) => {
  return (
    <button className="flex py-2 px-8 mx-auto text-white bg-pink-500 border-0 focus:outline-none hover:bg-pink-600 rounded text-lg">
      {props.children}
    </button>
  );
};
type ButtonProps = {
  children: string;
};
