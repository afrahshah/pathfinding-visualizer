import React, { Component } from 'react';
import './Node.css';
//node is a single cell in grid
export default class Node extends Component {
  
  render() {

    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';


      return (
        <div
          id={`node-${row}-${col}`} //Sets a unique id attribute based on the node's row and column, useful for styling or targeting specific nodes.
          className={`node ${extraClassName}`}  // Sets the class name for styling. The node class is always applied, and extraClassName is conditionally added based on the node's state.
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}></div>
      );
    }
  }
