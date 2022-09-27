import React from 'react';

export type ContainerProps = {
  children: React.ReactNode;
};

export const Container = (props: ContainerProps) => {
  return <div className="container px-5 py-12 mx-auto">{props.children}</div>;
};
