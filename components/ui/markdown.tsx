import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Prism from 'prismjs';  // Import Prism itself
import 'prismjs/components/prism-typescript'; // Explicitly import TypeScript support

interface MarkdownRendererProps {
  markdown: string;
  className?: string; // Allow an optional class name for styling the container
  style?: React.CSSProperties; // Allow inline styles for the container
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown, className, style }) => {

    // Ensure TypeScript language is registered (if not already)
    if (typeof Prism !== 'undefined' && Prism.languages && !Prism.languages.typescript) {
        require('prismjs/components/prism-typescript');
    }

  const renderers = useMemo(
    () => ({
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '');
        const language = match ? match[1] : null;

        // Use "ts" instead of "typescript"
        const languageAlias = language === 'typescript' ? 'ts' : language;

        return !inline && languageAlias ? (
          <SyntaxHighlighter
            style={dracula}
            language={languageAlias}
            PreTag="div"
            children={String(children).replace(/\n$/, '')}
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
      p: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <p {...restProps}>{children}</p>;
      },
      a: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <a {...restProps}>{children}</a>;
      },
      h1: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <h1 {...restProps}>{children}</h1>;
      },
      h2: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <h2 {...restProps}>{children}</h2>;
      },
      h3: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <h3 {...restProps}>{children}</h3>;
      },
      h4: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <h4 {...restProps}>{children}</h4>;
      },
      h5: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <h5 {...restProps}>{children}</h5>;
      },
      h6: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <h6 {...restProps}>{children}</h6>;
      },
      ul: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <ul {...restProps}>{children}</ul>;
      },
      ol: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <ol {...restProps}>{children}</ol>;
      },
      li: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <li {...restProps}>{children}</li>;
      },
      blockquote: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <blockquote {...restProps}>{children}</blockquote>;
      },
      table: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <table {...restProps}>{children}</table>;
      },
      thead: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <thead {...restProps}>{children}</thead>;
      },
      tbody: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <tbody {...restProps}>{children}</tbody>;
      },
      tr: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <tr {...restProps}>{children}</tr>;
      },
      th: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <th {...restProps}>{children}</th>;
      },
      td: ({node, children, ...props}) => {
          const { ordered, ...restProps } = props;
          return <td {...restProps}>{children}</td>;
      }
    }),
    []
  );

  return (
    <div className={className} style={style}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={renderers}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;