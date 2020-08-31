import React from 'react';
import PropTypes from 'prop-types';

const GameLeaderBoard = ({ winnersList }) => (
  <div className="leader-board">
    <h2 className="leader-board__title">Leader Board</h2>
    {
        winnersList.map(item => (
          <div key={item.id} className="leader-board__item">
            <span>
              { item.winner }
            </span>
            <span>
              { item.date }
            </span>
          </div>
        ))
      }
  </div>
);

GameLeaderBoard.propTypes = {
  winnersList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    winner: PropTypes.string
  }))
};

GameLeaderBoard.defaultProps = {
  winnersList: [{}]
};

export default GameLeaderBoard;
