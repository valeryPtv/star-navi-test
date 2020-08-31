import React, { useEffect, useState, useCallback } from 'react';
import 'styles/index.sass';
import 'normalize.css';
import BaseSelect from 'components/base/BaseSelect';
import GameField from 'components/GameField';
import axiosInstance from 'axiosInstance';
import GameLeaderBoard from 'components/GameLeaderBoard';

function App () {
  const [gameModes, setGameModes] = useState([]);
  const [winnersList, setWinnersList] = useState([]);
  const [gameOptions, setGameOptions] = useState({
    gameMode: undefined,
    userName: undefined
  });
  const [isGameActive, setIsGameActive] = useState(false);
  const [validationMessage, setValidationMessage] = useState(null);
  const [winMessage, setWinMessage] = useState(null);
  const [playButtonCaption, setPlayButtonCaption] = useState('Play');

  const handleFinishGame = (score, hasPlayerWon) => {
    const winner = hasPlayerWon ? gameOptions.userName : 'Computer';
    setWinMessage(`${winner} won !`);
    setPlayButtonCaption('Play again');
    setIsGameActive(false);
    const date = new Date();
    sendWinner({
      winner,
      date: `${date.toISOString().slice(11, 19)} ${date.toISOString().slice(0, 10).split('-').reverse()
        .join('.')}`
    });
  };

  const handleSetGameOption = (option, value) => {
    if (!isGameActive) {
      setGameOptions(oldGameOptions => ({
        ...oldGameOptions,
        [option]: value
      }));
    }
  };

  const handlePlayButtonClick = () => {
    if (gameOptions.gameMode === undefined || gameOptions.userName === undefined) {
      setValidationMessage('Please enter your name and choose game difficulty');
    } else {
      setValidationMessage(null);
      setPlayButtonCaption('Play');
      setWinMessage(null);
      setIsGameActive(true);
    }
  };

  const mapGameSettings = settings => (
    Object.keys(settings).map(key => ({
      text: `${key[0].toUpperCase()}${key.slice(1, key.indexOf('Mode'))}`,
      value: settings[key],
      key
    }))
  );

  const fetchLeaderBoard = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get('/winners');
      setWinnersList(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const sendWinner = async winnerData => {
    try {
      await axiosInstance.post('/winners', winnerData);
      await fetchLeaderBoard();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  useEffect(() => {
    const getGameSettings = async () => {
      try {
        const res = await axiosInstance.get('/game-settings');
        setGameModes(mapGameSettings(res.data));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };
    getGameSettings();
    fetchLeaderBoard();
  }, [fetchLeaderBoard]);

  return (
    <div className="App">
      <div className="game-container">
        <div className="game game__area">
          <div className="game__controls">
            { validationMessage && (
              <p className="game__validation-message">
                { validationMessage }
              </p>
            )}
            <BaseSelect
              options={gameModes}
              onChange={value => handleSetGameOption('gameMode', value)}
            />
            <input
              className="base-input"
              type="text"
              placeholder="Enter your name"
              onChange={e => handleSetGameOption('userName', e.target.value)}
            />
            <button
              className="play-btn"
              type="button"
              onClick={handlePlayButtonClick}
            >
              { playButtonCaption }
            </button>
            <p className="game__messages">
              {winMessage}
            </p>
          </div>
          <GameField
            gameMode={gameOptions.gameMode}
            isGameActive={isGameActive}
            handleFinishGame={handleFinishGame}
          />
        </div>
        <div className="score score__area">
          <GameLeaderBoard winnersList={winnersList} />
        </div>
      </div>
    </div>
  );
}

export default App;
