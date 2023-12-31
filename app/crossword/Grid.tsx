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
  if (event.key === "ArrowLeft") {
    console.log("Left arrow was pressedg")
    // Perform an action when the Enter key is pressed
  }
}

export default function Grid() {
  // TODO(scooternew): Document grid constraints.
  const gridSize = 10
  const gridSizePx = 400
  const gridWidthPercent = 100 / gridSize + "%"
  const paddingBottomPercent = 100 / gridSize + "%"

  const cells = []

  // TODO(scooternew): Support default props.
  for (var i = 0; i < gridSize * gridSize; i++) {
    cells.push(
      <Cell
        {...{
          selected: false,
          widthPercent: gridWidthPercent,
          paddingBottomPercent: paddingBottomPercent,
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
