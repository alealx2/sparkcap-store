import React from 'react';
import { PortableText } from '@portabletext/react';

const PortableTextComponent = ({ value }) => {
  const components = {
    types: {
      image: ({ value }) => (
        <img src={value.asset.url} alt={value.alt || ''} style={{ maxWidth: '100%' }} />
      ),
      imageFeature: ({ value }) => (
        <img src={value.image.asset.url} alt="" style={{ maxWidth: '100%' }} />
      ),
    },
    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      link: ({ children, value }) => (
        <a href={value.href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
    block: {
      normal: ({ children }) => <p>{children}</p>,
    },
  };

  return <PortableText value={value} components={components} />;
};

export default PortableTextComponent;
