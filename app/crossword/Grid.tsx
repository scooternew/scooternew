"use client"

import React, {
  KeyboardEventHandler,
  ReactComponentElement,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react"
import Cell, { CellProps } from "./Cell"

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

export const defaultGridState: GridProps = {
  gridLength: 12,
  gridSizePx: 500,
  selectedCell: { row: 0, col: 0 },
  direction: Direction.Horizontal,
}

const buildInitialCellsList = (
  gridState: GridProps
): Array<Array<CellProps>> => {
  const percent = 100 / gridState.gridLength + "%"
  return Array.from({ length: gridState.gridLength }, (_, colIndex) => {
    return colIndex
  }).map((colIndex) => {
    return Array.from({ length: gridState.gridLength }, (_, rowIndex) => {
      return {
        selected:
          gridState.selectedCell.row == rowIndex &&
          gridState.selectedCell.col == colIndex,
        rowIndex: rowIndex,
        columnIndex: colIndex,
        sizePercent: percent,
        blocked: false,
        displayText: "",
        highlighted: false,
      }
    })
  })
}

export default function Grid(props: { gridLength?: number }) {
  const [gridState, setGridState] = useState(
    props.gridLength
      ? { ...defaultGridState, gridLength: props.gridLength }
      : defaultGridState
  )

  const [cellsList, setCellsList] = useState(buildInitialCellsList(gridState))

  /**
   * Compute highlighted cells given direction.
   * @param gridState
   * @param cellsList
   * @returns
   */
  const computeHighlightedCells = (
    gridState: GridProps,
    cellsList: CellProps[][]
  ): Array<{ row: number; col: number }> => {
    const selectedCell = gridState.selectedCell
    const direction = gridState.direction
    if (direction == Direction.Vertical) {
      // const cellsRow = cellsList[1][2]

      const cellsColumn = cellsList.filter(
        (val, index) => index == selectedCell.row
      )

      console.log("Cells column")
      console.log(cellsColumn)

      console.log("Cells row")
      // console.log(cellsRow)
    }
    return []
  }

  const handleKeyEvent = (e: React.KeyboardEvent<HTMLElement>) => {
    console.log(e)

    const oldPosition = gridState.selectedCell

    if (e.keyCode >= 65 && e.keyCode <= 90) {
      // Clean this up, it's hacky.
      const cell = cellsList[oldPosition.col][oldPosition.row]
      if (!cell.blocked && cell.selected) {
        setCellsList((updatedCellsList) => {
          updatedCellsList[oldPosition.col][oldPosition.row].displayText =
            e.key.toUpperCase()
          return updatedCellsList
        })
        setGridState({ ...gridState }) // Force a re-render. Why is this needed?
      }
    }
    if (e.key == "Backspace") {
      const cell = cellsList[oldPosition.col][oldPosition.row]
      if (cell.selected)
        setCellsList((updatedCellsList) => {
          updatedCellsList[oldPosition.col][oldPosition.row].displayText = "" // Clear the text.
          return updatedCellsList
        })
      setGridState({ ...gridState }) // Force a re-render. Why is this needed?
    }
    if (e.key == "ArrowUp") {
      const newPosition = {
        row: gridState.selectedCell.row,
        col:
          gridState.selectedCell.col == 0
            ? gridState.gridLength - 1
            : gridState.selectedCell.col - 1,
      }
      setGridState({
        ...gridState,
        direction: Direction.Vertical,
        selectedCell: newPosition,
      })
      setCellsList((updatedCellsList) => {
        updatedCellsList[oldPosition.col][oldPosition.row].selected = false
        updatedCellsList[newPosition.col][newPosition.row].selected = true
        return updatedCellsList
      })
    }
    if (e.key == "ArrowRight") {
      const newPosition = {
        row:
          gridState.selectedCell.row == gridState.gridLength - 1
            ? 0
            : gridState.selectedCell.row + 1,
        col: gridState.selectedCell.col,
      }
      setGridState({
        ...gridState,
        direction: Direction.Horizontal,
        selectedCell: newPosition,
      })
      setCellsList((updatedCellsList) => {
        updatedCellsList[oldPosition.col][oldPosition.row].selected = false
        updatedCellsList[newPosition.col][newPosition.row].selected = true
        return updatedCellsList
      })
    }
    if (e.key == "ArrowLeft") {
      const newPosition = {
        row:
          gridState.selectedCell.row == 0
            ? gridState.gridLength - 1
            : gridState.selectedCell.row - 1,
        col: gridState.selectedCell.col,
      }
      setGridState({
        ...gridState,
        direction: Direction.Horizontal,
        selectedCell: newPosition,
      })
      setCellsList((updatedCellsList) => {
        updatedCellsList[oldPosition.col][oldPosition.row].selected = false
        updatedCellsList[newPosition.col][newPosition.row].selected = true
        return updatedCellsList
      })
    }
    if (e.key == "ArrowDown") {
      const newPosition = {
        row: gridState.selectedCell.row,
        col:
          gridState.selectedCell.col == gridState.gridLength - 1
            ? 0
            : gridState.selectedCell.col + 1,
      }
      setGridState({
        ...gridState,
        direction: Direction.Vertical,
        selectedCell: newPosition,
      })
      setCellsList((updatedCellsList) => {
        updatedCellsList[oldPosition.col][oldPosition.row].selected = false
        updatedCellsList[newPosition.col][newPosition.row].selected = true
        return updatedCellsList
      })
    }
    if (e.key == ".") {
      const oldBlocked = cellsList[oldPosition.col][oldPosition.row].blocked
      setCellsList((updatedCellsList) => {
        updatedCellsList[oldPosition.col][oldPosition.row].blocked = !oldBlocked
        updatedCellsList[oldPosition.col][oldPosition.row].displayText = "" // Clear the text.
        return updatedCellsList
      }) // Why doesn't this force a re-render?
      setGridState({ ...gridState }) // Force a re-render. Why is this needed?
    }
    if (e.key == " ") {
      const oldHighlighted =
        cellsList[oldPosition.col][oldPosition.row].highlighted
      setCellsList((updatedCellsList) => {
        updatedCellsList[oldPosition.col][oldPosition.row].highlighted =
          !oldHighlighted
        return updatedCellsList
      }) // Why doesn't this force a re-render?
      setGridState({ ...gridState }) // Force a re-render. Why is this needed?
    }
    if (e.key == "Enter") {
      computeHighlightedCells(gridState, cellsList)
    }

    e.preventDefault()
  }

  const displayCells = cellsList.map((row) => {
    return row.map((cell) => (
      <Cell
        key={"cell-" + cell.rowIndex + "-" + cell.columnIndex}
        selected={cell.selected}
        rowIndex={cell.rowIndex}
        columnIndex={cell.columnIndex}
        sizePercent={cell.sizePercent}
        blocked={cell.blocked}
        displayText={cell.displayText}
        highlighted={cell.highlighted}
      />
    ))
  })

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
      {...displayCells}
    </div>
  )
}
