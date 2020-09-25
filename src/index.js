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

/* Grid component actually fills out the board*/
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
      hasWon: false,
      numberOfMoves: 0,
      // Create the array of rows/columns, start all squares at "false"
      fillGrid: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  // Event handler for clicking on square
  // Will toggle on/off current square and its immediate neighbors
  selectSquare = (row, col) => {
    let gridCopy = arrayClone(this.state.fillGrid);
    
    function flipSquare(row, col) {
      if (row > -1 && row < 5 &&  col > -1 && col < 5) {
        gridCopy[row][col] = !gridCopy[row][col];
      }
    }

    flipSquare(row, col)
    flipSquare(row, col-1)
    flipSquare(row, col+1)
    flipSquare(row-1, col)
    flipSquare(row+1, col)

    let hasWon = gridCopy.every(row => row.every(square => !square));

		this.setState({
      fillGrid: gridCopy,
      numberOfMoves: this.state.numberOfMoves + 1,
      hasWon: hasWon
		});
  }
  

  // Creates random pattern of on/off squares 
  resetSquares = () => {
    let gridCopy = arrayClone(this.state.fillGrid)
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        gridCopy[i][j] = false;
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      fillGrid: gridCopy,
      hasWon: false,
      numberOfMoves: 0
    })
  }

  // On load, will run resetSquares so random board is ready to play
  componentDidMount() {
    this.resetSquares();
  }

  // Render specifies what should actually display on the screen
  render() {
    return (
      <div className="main">
        <h1 id="title">Lights Out</h1>
        <button className="center" id="reset-button" onClick={this.resetSquares}>Restart?</button>
        <div className="game-board">
          <Grid 
            fillGrid={this.state.fillGrid}
            rows={this.rows}
            cols={this.cols}
            selectSquare={this.selectSquare}
          />
        </div>
        <div className="game-info">
          {this.state.hasWon ? (<h2>You win!</h2>) : (<h2></h2>)}
          <h2>Number of Moves: {this.state.numberOfMoves}</h2>
        </div>
      </div>
    );
  }
}

// helper function so we don't update initial state/array directly 
function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

// ========================================

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);