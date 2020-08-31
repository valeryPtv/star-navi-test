import React, { useState, useEffect, Component } from 'react';

export default () => {
  console.log('learn hook func');
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `${count} count`;
  });
  return (
    <>
      Current count
      <br />
      { count }
      <br />
      <button label="inc count" value="increment count" type="button" onClick={() => setCount(count + 1)}
              style={{ padding: '5px', border: '1px solid red'}}>
        inc count
      </button>
    </>
  );
};

/*
class LearnHooks extends Component {
  constructor () {
    super();
    console.log('learn hook class');
    this.state = {
      count: 1
    };
  }

  setCount = countParam => {
    this.setState(prevState => ({
      ...prevState,
      count: countParam
    }));
  }

  render () {
    return (
      <>
        Current count
        <br />
        { this.state.count }
        <br />
        <button
          label="inc count"
          value="increment count"
          type="button"
          onClick={() => this.setCount(this.state.count + 1)}
          style={{ padding: '5px', border: '1px solid red' }}
        >
          inc count
        </button>
      </>
    );
  }
}

export default LearnHooks;
*/
