import React from 'react';
import PropTypes from 'prop-types';

const SuccessAlert = ({ children }) => (
  <div className="bg-green-100 border border-green-300 text-green-800 rounded-lg px-4 py-3 my-4 text-center font-medium shadow-md flex items-center justify-center gap-2">
    <span role="img" aria-label="success">✅</span>
    {children}
  </div>
);

SuccessAlert.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SuccessAlert;
