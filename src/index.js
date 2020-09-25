import React from 'react';
import ReactDOM from 'react-dom';
/*import './index.css';*/

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="game-board">
          Hello World
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);