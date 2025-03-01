import React from "react";

const LanguageSwitcher = ({ setLanguage }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => setLanguage("en")}
        className="px-4 py-2 border rounded-md hover:bg-gray-200"
      >
        English
      </button>
      <button
        onClick={() => setLanguage("hi")}
        className="px-4 py-2 border rounded-md hover:bg-gray-200"
      >
        हिंदी
      </button>
    </div>
  );
};

export default LanguageSwitcher;
