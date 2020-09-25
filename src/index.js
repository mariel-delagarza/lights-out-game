import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*Main Component will hold all others*/
class Main extends React.Component {

  // Constructors initialize local state and bind 
  // event handler methods to an instance
  constructor() {
    super();
    this.rows = 5;
    this.cols = 5;
    this.state = {
      numberOfMoves: 0,
      // Create the array of rows/columns, start all squares at "false"
      fillGrid: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  // Render specifies what should actually display on the screen
  render() {
    return (
      <div className="main">
        <h1 id="title">Lights Out</h1>
        <div className="game-board">
          hello
        </div>
        <div className="game-info">
          <h2>Number of Moves: {this.state.numberOfMoves}</h2>
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