import React from 'react';
import PropTypes from 'prop-types';

function Button({ dataTestId, type, name, disabled, onClick, text }) {
  return (
    <button
      data-testid={ dataTestId }
      type={ type === 'submit' ? 'submit' : 'button' }
      name={ name }
      disabled={ disabled }
      onClick={ onClick }
    >
      { text }
    </button>
  );
}

Button.defaultProps = {
  name: undefined,
  disabled: false,
  onClick: () => {},
};

Button.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Button;
