"use client"

import Cell from "./Cell"

import { ReactNode, useState, useEffect } from "react"

enum Direction {
  Horizontal,
  Vertical,
}

export interface GridProps {
  width: number
  height: number
  cells: string[]
}

export default function Grid() {
  // TODO(scooternew): Document grid constraints.
  const gridSize = 12
  const gridSizePx = 500
  const gridWidthPercent = 100 / gridSize + "%"
  const paddingBottomPercent = 100 / gridSize + "%"

  // TODO(scooternew): Externalize as global or top-level constants.
  const [selectedX, setSelectedX] = useState(0)
  const [selectedY, setSelectedY] = useState(0)
  const [direction, setDirection] = useState(Direction.Horizontal)
  // const [cellList, setCellList] = useState([])

  // TODO(scooternew): Model as map or 2d array.
  const cells = []

  // TODO(scooternew): Move into separate functions.
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // console.log(event)
    if (event.key === "ArrowLeft") {
      console.log("Left arrow was pressed")
      setSelectedX(selectedX == 0 ? gridSize - 1 : selectedX - 1)
      setDirection(Direction.Horizontal)
    }
    if (event.key === "ArrowRight") {
      console.log("Right arrow was pressed")
      setSelectedX(selectedX == gridSize - 1 ? 0 : selectedX + 1)
      setDirection(Direction.Horizontal)
    }
    if (event.key === "ArrowUp") {
      console.log("Up arrow was pressed")
      setSelectedY(selectedY == 0 ? gridSize - 1 : selectedY - 1)
      setDirection(Direction.Vertical)
    }
    if (event.key === "ArrowDown") {
      console.log("Down arrow was pressed")
      setSelectedY(selectedY == gridSize - 1 ? 0 : selectedY + 1)
    }
    if (event.key === ".") {
      console.log("Grid level event handler - period key was pressed")
      // setIsBlock(!isBlock)
    }
  }

  console.log("Grid - selected X: " + selectedX)
  console.log("Grid - selected Y: " + selectedY)

  // TODO(scooternew): Support default props.
  for (var i = 0; i < gridSize * gridSize; i++) {
    const curX = i % gridSize
    const curY = Math.floor(i / gridSize)
    let curSelected = curX == selectedX && curY == selectedY

    cells.push(
      <Cell
        {...{
          selected: curSelected,
          widthPercent: gridWidthPercent,
          paddingBottomPercent: paddingBottomPercent,
          rowIndex: curX,
          columnIndex: curY,
        }}
        key={"cell" + i}
      />
    )
  }

  // TODO(scooternew): Handle events at top-level and propagate downward.
  // TODO(scooternew): Debounce events.
  return (
    <div
      className="grid"
      onKeyDown={handleKeyDown}
      style={{
        display: "block",
        width: gridSizePx,
        height: gridSizePx,
        backgroundColor: "gray",
      }}
      tabIndex={-1} // Ensures this can respond to key events.
    >
      {...cells}
    </div>
  )
}
