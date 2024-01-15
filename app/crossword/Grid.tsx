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
import { GlobalGridContext, GlobalGridProps } from "./GlobalGridContext"

enum Direction {
  Horizontal,
  Vertical,
}

interface GridProps {
  readonly gridLength: number
  readonly gridSizePx: number
  selectedCell: { row: number; col: number }
}

const defaultGridState: GridProps = {
  gridLength: 10,
  gridSizePx: 500,
  selectedCell: { row: 0, col: 0 },
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
  // TODO(scooternew): Document grid constraints.
  const [gridState, setGridState] = useState(defaultGridState)

  const handleEvent = (e: React.KeyboardEvent<HTMLElement>) => {
    console.log(e)
    if ((e.key = "up")) {
      setGridState((oldGridState) => {
        let newGridState = oldGridState
        newGridState.selectedCell = {
          row: oldGridState.selectedCell.row,
          col:
            oldGridState.selectedCell.col == 0
              ? gridState.gridLength - 1
              : gridState.selectedCell.col - 1,
        }
        return newGridState
      })
    }
  }

  const handleEventCallback = useCallback(handleEvent, [gridState])

  console.log("Grid state: " + JSON.stringify(gridState))

  return (
    // <gridContext.Provider value={gridState}>
    <div
      onKeyDown={handleEventCallback}
      className="grid"
      style={{
        display: "table-cell",
        border: "5px solid black",
        width: gridState.gridSizePx,
        height: gridState.gridSizePx,
        backgroundColor: "gray",
      }}
      tabIndex={-1}
    >
      {...buildGridElements(gridState)}
    </div>
    // </gridContext.Provider>
  )
}
