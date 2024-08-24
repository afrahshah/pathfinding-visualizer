import React, { Component } from 'react';
import Node from './Node/Node';
import './Pathfinding.css';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();    //for (this)- constructor of React.component
    this.state = {
      grid: [],
      mouseIsPressed: false,
      isPlacingStart: false,
      isPlacingFinish: false,
      startNodePosition: { row: START_NODE_ROW, col: START_NODE_COL },
      finishNodePosition: { row: FINISH_NODE_ROW, col: FINISH_NODE_COL },
    };
  }

  componentDidMount() {
    const { startNodePosition, finishNodePosition } = this.state;
    const grid = getInitialGrid(startNodePosition, finishNodePosition);
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const { isPlacingStart, isPlacingFinish, grid, startNodePosition, finishNodePosition } = this.state;
    //destructure state

    if (isPlacingStart) {
      const newGrid = grid.slice();
      //create copy of grid to avoid mutating state
      const prevStartNode = newGrid[startNodePosition.row][startNodePosition.col];
      const newStartNode = newGrid[row][col];

      prevStartNode.isStart = false;
      newStartNode.isStart = true;
      newStartNode.isWall = false;

      this.setState({
        grid: newGrid,
        isPlacingStart: false,
        startNodePosition: { row, col },
      });
    } else if (isPlacingFinish) {
      const newGrid = grid.slice();
      const prevFinishNode = newGrid[finishNodePosition.row][finishNodePosition.col];
      const newFinishNode = newGrid[row][col];

      prevFinishNode.isFinish = false;
      newFinishNode.isFinish = true;
      newFinishNode.isWall = false;

      this.setState({
        grid: newGrid,
        isPlacingFinish: false,
        finishNodePosition: { row, col },
      });
    } else {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() { //release mouse button
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateBFS(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateDFS(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const { grid, startNodePosition, finishNodePosition } = this.state;
    const startNode = grid[startNodePosition.row][startNodePosition.col];
    const finishNode = grid[finishNodePosition.row][finishNodePosition.col];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeBFS() {
    const { grid, startNodePosition, finishNodePosition } = this.state;
    const startNode = grid[startNodePosition.row][startNodePosition.col];
    const finishNode = grid[finishNodePosition.row][finishNodePosition.col];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDFS() {
    const { grid, startNodePosition, finishNodePosition } = this.state;
    const startNode = grid[startNodePosition.row][startNodePosition.col];
    const finishNode = grid[finishNodePosition.row][finishNodePosition.col];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDFS(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  resetGrid() {
    window.location.reload();
  }

  placeStartNode() {
    this.setState({ isPlacingStart: true });
  }

  placeFinishNode() {
    this.setState({ isPlacingFinish: true });
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => this.visualizeBFS()}>
          Visualize BFS Algorithm
        </button>
        <button onClick={() => this.visualizeDFS()}>
          Visualize DFS Algorithm
        </button>
        <button onClick={() => this.placeStartNode()}>
          Replace Start Node
        </button>
        <button onClick={() => this.placeFinishNode()}>
          Replace Finish Node
        </button>
        <button onClick={() => this.resetGrid()}>
          Reset Grid
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = (startNodePosition, finishNodePosition) => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      const node = createNode(col, row);
      if (row === startNodePosition.row && col === startNodePosition.col) {
        node.isStart = true;
      }
      if (row === finishNodePosition.row && col === finishNodePosition.col) {
        node.isFinish = true;
      }
      currentRow.push(node);
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: false,
    isFinish: false,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
