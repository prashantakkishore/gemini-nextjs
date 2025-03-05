import React, { useState, useRef, useEffect } from 'react';

interface RoundedTextInputProps {
  onTextSubmit: (text: string) => void;
}

const RoundedTextInput: React.FC<RoundedTextInputProps> = ({ onTextSubmit }) => {
  const [text, setText] = useState<string>('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (text.trim() !== "") {
      onTextSubmit("Query: " + text); // Prepend "Query: " to the submitted text
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault(); // Prevent default newline insertion
      handleSubmit();
    }
  };

  const handleClearClick = () => {
    setText('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="relative">
      <textarea
        ref={inputRef}
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="bg-white text-gray-800 rounded-xl px-5 py-3 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-base w-full pr-12 font-sans resize-none leading-normal shadow-md transition duration-200"
        placeholder="Type something..."
        rows={3}
      />

      <button
        onClick={handleClearClick}
        className="bg-red-500 hover:bg-red-700 text-white rounded-full px-4 py-2 border-none cursor-pointer text-sm absolute top-2 right-2 font-sans shadow-md transition duration-200"
      >
        Clear
      </button>
    </div>
  );
};

export default RoundedTextInput;