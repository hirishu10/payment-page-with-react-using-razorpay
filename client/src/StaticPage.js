import React from "react";

const StaticPage = ({ val, link }) => {
  return (
    <div className="">
      <header className="">
        <div className="">
          <p className="inside-text">
            Payment Page with <code>React</code> {`=>`} {val}
          </p>
          <a
            href={link}
            className="btn btn-outline-success"
            target="_blank"
            rel="noreferrer"
          >
            {`${val}`}
          </a>
        </div>
      </header>
    </div>
  );
};

export default StaticPage;
