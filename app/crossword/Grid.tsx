"use client"

import React, {
  KeyboardEventHandler,
  ReactComponentElement,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react"
import Cell from "./Cell"

import { ReactNode, useState, useEffect } from "react"

enum Direction {
  Horizontal,
  Vertical,
}

export interface GridProps {
  readonly gridLength: number
  readonly gridSizePx: number
  selectedCell: { row: number; col: number }
  direction: Direction
}

const defaultGridState: GridProps = {
  gridLength: 5,
  gridSizePx: 400,
  selectedCell: { row: 0, col: 0 },
  direction: Direction.Horizontal,
}

// Returns a 2D array of size length x length. Each element
// contains an object with the corresponding row and column index.
const buildGridElements = (gridState: GridProps) => {
  const percent = 100 / gridState.gridLength + "%"
  return Array.from({ length: gridState.gridLength }, (_, colIndex) => {
    return colIndex
  }).map((colIndex) => {
    return Array.from({ length: gridState.gridLength }, (_, rowIndex) => {
      return (
        <Cell
          key={"cell-" + rowIndex + "-" + colIndex}
          selected={
            gridState.selectedCell.row == rowIndex &&
            gridState.selectedCell.col == colIndex
          }
          rowIndex={rowIndex}
          columnIndex={colIndex}
          sizePercent={percent}
        />
      )
    })
  })
}

export default function Grid() {
  // TODO(scooternew): useContext for global state. How does this work?
  const [gridState, setGridState] = useState(defaultGridState)

  // useCallback on this for memoization?
  const handleKeyEvent = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key == "ArrowUp") {
      // TODO(scooternew): Spread operator here creates a new object, updating state.
      setGridState({
        ...gridState,
        direction: Direction.Vertical,
        selectedCell: {
          row: gridState.selectedCell.row,
          col:
            gridState.selectedCell.col == 0
              ? gridState.gridLength - 1
              : gridState.selectedCell.col - 1,
        },
      })
    }
    if (e.key == "ArrowRight") {
      // TODO(scooternew): Spread operator here creates a new object, updating state.
      setGridState({
        ...gridState,
        direction: Direction.Horizontal,
        selectedCell: {
          row:
            gridState.selectedCell.row == gridState.gridLength - 1
              ? 0
              : gridState.selectedCell.row + 1,
          col: gridState.selectedCell.col,
        },
      })
    }
    if (e.key == "ArrowLeft") {
      // TODO(scooternew): Spread operator here creates a new object, updating state.
      setGridState({
        ...gridState,
        direction: Direction.Horizontal,
        selectedCell: {
          row:
            gridState.selectedCell.row == 0
              ? gridState.gridLength - 1
              : gridState.selectedCell.row - 1,
          col: gridState.selectedCell.col,
        },
      })
    }
    if (e.key == "ArrowDown") {
      // TODO(scooternew): Spread operator here creates a new object, updating state.
      setGridState({
        ...gridState,
        direction: Direction.Vertical,
        selectedCell: {
          row: gridState.selectedCell.row,
          col:
            gridState.selectedCell.col == gridState.gridLength - 1
              ? 0
              : gridState.selectedCell.col + 1,
        },
      })
    }
  }

  console.log("Grid state: " + JSON.stringify(gridState))

  return (
    <div
      onKeyDown={handleKeyEvent}
      className="grid"
      style={{
        display: "table-cell",
        border: "5px solid black",
        width: gridState.gridSizePx,
        height: gridState.gridSizePx,
        outline: "none", // Prevents border from displaying during focus.
        backgroundColor: "gray",
      }}
      tabIndex={-1}
    >
      {...buildGridElements(gridState)}
    </div>
  )
}
