import * as React from 'react';

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
    interface ElementClass extends React.Component<any> {
      render(): JSX.Element;
    }
    interface IntrinsicElements extends React.JSX.IntrinsicElements { }
  }
}

// This needs to be a module
export {};

