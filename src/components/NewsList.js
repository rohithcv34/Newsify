import React from "react";

const NewsList = ({ articles }) => {
  return (
    <div>
      {articles.map((article, index) => (
        <div key={index} className=" border-b border-grey-200 mb-4 pb-4">
          <h3 className="font-bold text-xl">{article.title}</h3>
          <p className="text-gray-600">{article.description}</p>
          <a
            href={article.url}
            className="text-blue-600"
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
