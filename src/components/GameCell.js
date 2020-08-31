import React from 'react';
import PropTypes from 'prop-types';

const GameCell = ({ cellStatus, handleClick, size }) => {
  let cellClass = '';
  switch (cellStatus) {
    case 'player':
      cellClass = 'game__field-square--green';
      break;
    case 'comp':
      cellClass = 'game__field-square--red';
      break;
    case 'pending':
      cellClass = 'game__field-square--blue';
      break;
    default: cellClass = '';
  }
  return (
    <div
      onClick={handleClick}
      className={`game__field-square ${cellClass}`}
      role="button"
      aria-label="game-cell"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

GameCell.propTypes = {
  cellStatus: PropTypes.string,
  handleClick: PropTypes.func.isRequired
};

GameCell.defaultProps = {
  cellStatus: null
};

export default GameCell;
