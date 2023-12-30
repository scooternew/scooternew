"use client"

import Cell from "./Cell"

import { ReactNode, useState, useEffect } from "react"

export interface GridProps {
  width: number
  height: number
  cells: string[]
  // entriesByCell: [Cross, Cross][];
  // entries: Entry[];
  // vBars: Set<number>;
  // hBars: Set<number>;
}

function handleKeyDown(event: React.KeyboardEvent) {
  console.log(event)
  if (event.key === "Enter") {
    console.log("Enter key was pressed!!")
    // Perform an action when the Enter key is pressed
  }
}

function componentDidMount() {
  console.log("I was triggered during componentDidMount")
}

export default function Grid() {
  console.log("Grid is created!")
  //   const [gridSize, setGridSize] = useState({ width: 15, height: 15 })
  const gridSize = 10
  const gridSizePx = 400 // TODO(scooternew): Document constraints.
  const gridWidthPercent = 100 / gridSize + "%"
  const paddingBottomPercent = 100 / gridSize + "%"

  const cells = []

  // TODO(scooternew): Default values / optional props.
  for (var i = 0; i < gridSize * gridSize; i++) {
    cells.push(
      <Cell
        {...{
          selected: false,
          widthPercent: gridWidthPercent,
          paddingBottomPercent: paddingBottomPercent,
        }}
      />
    )
  }

  return (
    <div
      // TODO(scooternew): Correctly register and process key events.
      // TODO(scooternew): Consider a general eventing system (e.g. eventbus, pub/sub, etc.).
      onKeyDown={(e) => console.log(e)}
      className="grid"
      style={{
        display: "block",
        width: gridSizePx,
        height: gridSizePx,
        backgroundColor: "gray",
      }}
    >
      {...cells}
    </div>
  )
}
