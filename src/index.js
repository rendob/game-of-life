import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// クラスで書いても良いが, stateがなくてrenderメソッドしか無い場合は関数コンポーネントとして簡単に書ける
function Cell(props) {
  const style = (props.value === 1) ? "alive" : "dead";
  return (
    <td
      className={style}
      onClick={props.onClick}
      onContextMenu={props.onContextMenu}
      onMouseEnter={props.onMouseEnter}
    >
    </td>
  )
}

class Board extends React.Component {
  renderCell(i) {
    return (
      <Cell
        key={i}
        value={this.props.cells[i]}
        onClick={() => this.props.onClick(i)}
        onContextMenu={(e) => this.props.onContextMenu(e, i)}
        onMouseEnter={(e) => this.props.onMouseEnter(e, i)}
      />);  // 引数=propsのイメージ
  }

  render() {
    const n = Math.sqrt(this.props.cells.length);

    let table = [];
    for (let i = 0; i < n; i++) {
      let row = [];
      for (let j = 0; j < n; j++) {
        row.push(this.renderCell(i*n+j));
      }
      table.push(<tbody key={i}><tr key={i} className="cellRow">{row}</tr></tbody>);
    }
    return (
      <table className="cells">
        {table}
      </table>
    );
  }
}

// function RuleCheckBox(props) {
//   return (
//     <input
//       type="checkbox"
//       value={props.id}
//       onChange={props.onChange}
//       checked=
//   )
// }

// function Rules(props) {
//   let buttons = [];

//   return (
//     <div className="rules">
//       <div className="rule-name">
//         {props.value}
//       </div>

//     </div>
//   )
// }

class Game extends React.Component {
  constructor(props) {
    super(props);  // jsでは, サブクラスのコンストラクタを定義する際は常にsuperを呼ぶ必要がある
    const n = 55;  // 1辺のセル数
    this.state = {
      cells: Array(n**2).fill(0),
      bRules: [3],
      sRules: [2, 3],
      isPlaying: false,
    };
  }

  randomizeCells() {
    const cells = this.state.cells.map(() => binaryRand(0, 1, 0.8));
    this.setState({
      cells: cells,
    })
  }

  updateCells() {
    const n2 = this.state.cells.length;
    const n = Math.sqrt(n2);
    const neighbors = [-n-1+n2, -n+n2, -n+1+n2, -1+n2, 1, n-1, n, n+1];
    const nextCells = Array(n2).fill(0);
    
    for (let i = 0; i < n2; i++) {
      const aliveNum = neighbors.map(val => this.state.cells[(i+val)%n2]).reduce((a, b) => a + b);
      const rules = (this.state.cells[i] === 1) ? this.state.sRules : this.state.bRules;
      nextCells[i] = Number(rules.includes(aliveNum));
    }
    
    this.setState({
      cells: nextCells,
    });
  }

  togglePlay() {
    const isPlaying = !(this.state.isPlaying);
    this.setState({
      isPlaying: isPlaying,
    });

    if (isPlaying) {  // set timer to update cells
      this.timerID = setInterval(
        () => this.updateCells(),
        120
      );
    } else {  // clear timer
      clearInterval(this.timerID);
    }
  }

  setCell(i, x) {  // set i-th cell to x
    const cells = this.state.cells.slice();
    cells[i] = x;
    this.setState({
      cells: cells,
    });
  }

  handleClick(i) {
    this.setCell(i, 1);
  }

  handleRightClick(e, i) {
    e.preventDefault();
    this.setCell(i, 0);
  }

  handleMouseEnter(e, i) {
    const pressedButtons = e.buttons;
    if (pressedButtons%2 === 1) {  // alive
      this.setCell(i, 1);
    } else if (pressedButtons === 2) {  // dead
      this.setCell(i, 0);
    }
  }

  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     xIsNext: (step % 2) === 0,
  //   });  // 更新したい値だけ書いておけば良い
  // }

  render() {
    const rules = `B: ${this.state.bRules.join(', ')} / S: ${this.state.sRules.join(', ')}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            cells={this.state.cells}
            onClick={(i) => this.handleClick(i)}
            onContextMenu={(e, i) => this.handleRightClick(e, i)}
            onMouseEnter={(e, i) => this.handleMouseEnter(e, i)}
          />
        </div>
        <div className="game-info">
          <div>{rules}</div>
          <button
            className="play-button"
            onClick={() => this.togglePlay()}
          >{this.state.isPlaying ? 'Pause' : 'Play'}</button>
          <button
            className="random-button"
            onClick={() => this.randomizeCells()}
          >Random</button>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function binaryRand(a=0, b=1, r=0.5) {
  // 確率rでaを, 確率(1-r)でbを選ぶ
  return (Math.random() < r) ? a : b;
}
