import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*for individual squares*/
class Square extends React.Component {
  selectSquare = () => {
    this.props.selectSquare(this.props.row, this.props.col);
  }

  render() {
    return (
      <div 
        className={this.props.squareClass}
        id={this.props.id}
        onClick={this.selectSquare}
      />
    )
  }
}

/* Grid component finishes setting up the game board*/
class Grid extends React.Component {
  render() {
    const width = (this.props.cols * 64);
    let rowsArr = [];

    let squareClass = "";
    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let squareId = i + "_" + j;

        squareClass = this.props.fillGrid[i][j] ? "square on" : "square off";

        rowsArr.push(
          <Square 
            squareClass = {squareClass}
            key = {squareId}
            squareId = {squareId}
            row = {i}
            col = {j} 
            selectSquare = {this.props.selectSquare}
          />
        )
      }
    }

    return (
      <div className="grid" style={{width: width}}>
        {rowsArr}
      </div>
    )
  }
}


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

  selectSquare = (row, col) => {
		let gridCopy = arrayClone(this.state.fillGrid);
		gridCopy[row][col] = !gridCopy[row][col];
		this.setState({
			fillGrid: gridCopy
		});
	}

  // Render specifies what should actually display on the screen
  render() {
    return (
      <div className="main">
        <h1 id="title">Lights Out</h1>
        <div className="game-board">
          <Grid 
            fillGrid={this.state.fillGrid}
            rows={this.rows}
            cols={this.cols}
            selectSquare={this.selectSquare}
          />
        </div>
        <div className="game-info">
          <h2>Number of Moves: {this.state.numberOfMoves}</h2>
        </div>
      </div>
    );
  }
}

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

// ========================================

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);