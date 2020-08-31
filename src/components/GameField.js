import React, {
  useState, useEffect, useRef, useCallback
} from 'react';
import PropTypes from 'prop-types';
import GameCell from 'components/GameCell';

const setupField = size => {
  const field = [];
  for (let i = 0; i < size; i++) {
    field.push({
      key: i,
      value: []
    });
    for (let j = 0; j < size; j++) {
      field[i].value.push({
        key: j,
        value: null
      });
    }
  }
  return field;
};

const GameField = ({ gameMode, isGameActive, handleFinishGame }) => {
  // console.log('render gameField');
  const [fieldState, setFieldState] = useState(setupField(gameMode.field));
  const [cellSize, setCellSize] = useState(null);
  const [stepData, setStepData] = useState({
    isWaitingStepNow: true,
    lastRow: null,
    lastCell: null
  });
  const fieldRef = useRef(null);
  const moveTimer = useRef(0);
  const computerScore = useRef(0);
  const playerScore = useRef(0);
  const isGameFinished = useRef(false);

  const getCellValue = (row, cell) => fieldState[row].value[cell].value;

  const calcCellSize = useCallback(() => {
    if (fieldRef.current) {
      const width = parseInt(fieldRef.current.getBoundingClientRect().width, 10);
      setCellSize(Math.floor((width / gameMode.field)));
    }
  }, [gameMode.field]);

  const chooseRandomCell = size => {
    let row = null;
    let cell = null;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      row = Math.floor(Math.random() * size);
      cell = Math.floor(Math.random() * size);
      if (getCellValue(row, cell) === null) {
        return { row, cell };
      }
    }
  };

  const setFieldCellValue = (value, row, cell) => {
    setFieldState(prevFieldState => {
      const prevCellVal = prevFieldState[row].value[cell].value;
      if (prevCellVal !== 'player' || prevCellVal !== 'comp') {
        const newFieldState = [...prevFieldState];
        const newRow = [...newFieldState[row].value];
        newRow[cell].value = value;
        newFieldState[row].value = newRow;
        return newFieldState;
      }
    });
  };

  const processGameStep = () => {
    if (stepData.isWaitingStepNow) {
      const { row, cell } = chooseRandomCell(gameMode.field);
      setFieldCellValue('pending', row, cell);
      setStepData({
        isWaitingStepNow: false,
        lastRow: row,
        lastCell: cell
      });
    } else {
      const { lastRow, lastCell } = stepData;
      if (getCellValue(lastRow, lastCell) !== 'player') {
        setFieldCellValue('comp', lastRow, lastCell);
        computerScore.current += 1;
        checkWinner(computerScore.current, false);
      }
      setStepData({
        isWaitingStepNow: true,
        lastRow: null,
        lastCell: null
      });
    }
  };

  const handleCellClick = (row, cell) => {
    if (getCellValue(row, cell) === 'pending') {
      setFieldCellValue('player', row, cell);
      playerScore.current += 1;
      checkWinner(playerScore.current, true);
    }
  };

  const checkWinner = (score, hasPlayerWon) => {
    const winScore = Math.ceil(gameMode.field ** 2 / 2);
    if (score >= winScore) {
      clearTimeout(moveTimer.current);
      isGameFinished.current = true;
      computerScore.current = 0;
      playerScore.current = 0;
      setStepData({
        isWaitingStepNow: false,
        lastRow: null,
        lastCell: null
      });
      handleFinishGame(score, hasPlayerWon);
    }
  };

  useEffect(() => {
    if (isGameActive) {
      if (isGameFinished.current) {
        setFieldState(setupField(gameMode.field));
        isGameFinished.current = false;
      }
      if (stepData.isWaitingStepNow) {
        processGameStep();
      } else {
        moveTimer.current = setTimeout(processGameStep, gameMode.delay);
      }
    }
    return () => {
      clearTimeout(moveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameActive, stepData, gameMode.delay]);

  useEffect(() => {
    setFieldState(setupField(gameMode.field));
    calcCellSize();
  }, [gameMode, calcCellSize]);

  return (
    <div className="game__field" ref={fieldRef}>
      {
        fieldState.map(row => (
          <div className="game__field-row" key={row.key}>
            {row.value.map(cell => (
              <GameCell
                cellStatus={getCellValue(row.key, cell.key)}
                size={cellSize}
                handleClick={() => handleCellClick(row.key, cell.key)}
                key={cell.key}
              />
            ))}
          </div>
        ))
      }
    </div>
  );
};

GameField.propTypes = {
  gameMode: PropTypes.shape({
    delay: PropTypes.number,
    field: PropTypes.number
  }),
  isGameActive: PropTypes.bool.isRequired,
  handleFinishGame: PropTypes.func.isRequired
};

GameField.defaultProps = {
  gameMode: {
    delay: 2000,
    field: 5
  }
};

export default GameField;
