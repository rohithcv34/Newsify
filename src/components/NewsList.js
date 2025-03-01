import React from "react";

const NewsList = ({ articles }) => {
  return (
    <div>
      {articles.map((article, index) => (
        <div key={index} className="border-b border-gray-200 mb-4 pb-4">
          {/* Check if the article has an image */}
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto rounded-lg mb-3"
            />
          )}

          <h3 className="font-bold text-xl mb-2">{article.title}</h3>

          {/* If description exists, render it, else use a fallback message */}
          <p className="text-gray-600 mb-3">
            {article.description || "No description available."}
          </p>

          <a
            href={article.url}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
