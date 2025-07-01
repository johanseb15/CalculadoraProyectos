import React from 'react';

const ErrorAlert = ({ children }) => (
  <div className="bg-red-100 border border-red-300 text-red-800 rounded-lg px-4 py-3 my-4 text-center font-medium shadow-md flex items-center justify-center gap-2">
    <span role="img" aria-label="error">⚠️</span>
    {children}
  </div>
);

export default ErrorAlert;
