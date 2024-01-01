"use client"

import React, { ReactComponentElement } from "react"
import Cell from "./Cell"

import { ReactNode, useState, useEffect } from "react"

enum Direction {
  Horizontal,
  Vertical,
}

export interface GridProps {
  width: number
  height: number
  // cells: string[]
}

export default function Grid() {
  // TODO(scooternew): Document grid constraints.
  const gridSize = 12
  const gridSizePx = 500
  const gridWidthPercent = 100 / gridSize + "%"
  const paddingBottomPercent = 100 / gridSize + "%"

  // TODO(scooternew): Externalize as global or top-level constants.
  const [cursorPosition, setCursorPosition] = useState([0, 0])
  const [direction, setDirection] = useState(Direction.Horizontal)
  const [blockList, setBlockList] = useState({})
  // TODO(scooternew): Model as map or 2d array.

  const cellsList = []

  // TODO(scooternew): Support default props.
  for (var i = 0; i < gridSize * gridSize; i++) {
    const curX = i % gridSize
    const curY = Math.floor(i / gridSize)
    let curSelected = curX == cursorPosition[0] && curY == cursorPosition[1]

    cellsList.push(
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

  const [grid, setGrid] = useState(cellsList)

  // TODO(scooternew): Forward ref?
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)

    // clean up
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // TODO(scooternew): Move into separate functions.
  const handleKeyDown = (event: any) => {
    console.log(event)
    const cellIndexX = cursorPosition[0]
    const cellIndexY = cursorPosition[1]
    if (event.key === "ArrowLeft") {
      console.log("Left arrow was pressed")
      setCursorPosition((cell) => [
        cell[0] == 0 ? gridSize - 1 : cell[0] - 1,
        cell[1],
      ])
      setDirection(Direction.Horizontal)
    }
    if (event.key === "ArrowRight") {
      console.log("Right arrow was pressed")
      setCursorPosition((cell) => [
        cell[0] == gridSize - 1 ? 0 : cell[0] + 1,
        cell[1],
      ])
      setDirection(Direction.Horizontal)
    }
    if (event.key === "ArrowDown") {
      console.log("Up arrow was pressed")
      setCursorPosition((cell) => [
        cell[0],
        cell[1] == gridSize - 1 ? 0 : cell[1] + 1,
      ])
      setDirection(Direction.Vertical)
    }
    if (event.key === "ArrowUp") {
      console.log("Down arrow was pressed")
      setCursorPosition((cell) => [
        cell[0],
        cell[1] == 0 ? gridSize - 1 : cell[1] - 1,
      ])
      setDirection(Direction.Vertical)
    }
    if (event.key === ".") {
      console.log("Period key was pressed")
      const map = { test: "Hello!" }
      setBlockList(map)
    }
  }

  console.log(
    "Selected cell: [" + cursorPosition[0] + ", " + cursorPosition[1] + "]"
  )

  console.log("CellsList: " + cellsList)
  console.log("Grid: " + grid)
  console.log("Blocklist: " + blockList)

  // TODO(scooternew): Handle events at top-level and propagate downward.
  // TODO(scooternew): Debounce events.
  return (
    <React.StrictMode>
      <div
        className="grid"
        onKeyDown={handleKeyDown}
        style={{
          display: "table-cell", // TODO(scooternew): should be "block" or "inline-block"
          border: "5px solid black",
          width: gridSizePx,
          height: gridSizePx,
          backgroundColor: "gray",
        }}
        tabIndex={-1} // Ensures this can respond to key events.
      >
        {...cellsList}
      </div>
    </React.StrictMode>
  )
}
