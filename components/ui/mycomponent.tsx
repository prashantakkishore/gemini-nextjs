import React, { useState, useEffect } from 'react';
import MarkdownRenderer from './markdown';

interface MyComponentProps {
  markdown: string | null | undefined;
}

const MyComponent: React.FC<MyComponentProps> = ({ markdown }) => {
  const [allMarkdownText, setAllMarkdownText] = useState<string>('');
  const [textAreaValue, setTextAreaValue] = useState<string>('');

  useEffect(() => {
    if (markdown) {
      setAllMarkdownText(prevText => prevText + '\n' + markdown);
    }
  }, [markdown]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };

  return (
    <div className="bg-gray-100 rounded-md shadow-md p-4 w-[520px]">
      <div className="overflow-auto h-64" style={{fontSize: '0.8rem'}}> {/* Added height, overflow, and font size */}
        <MarkdownRenderer markdown={allMarkdownText} />
      </div>
    </div>
  );
};

export { MyComponent };