import React from "react";

const ErrorPage = ({ msg, status }) => {
  return (
    <>
      <h1>Error</h1>

      <p>
        An error has occured with {status}: {msg}
      </p>
    </>
  );
};

export default ErrorPage;
