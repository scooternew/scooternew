"use client"

import Cell from "./Cell"

import { ReactNode, useState } from "react"

export interface GridProps {
  width: number
  height: number
  cells: string[]
  // entriesByCell: [Cross, Cross][];
  // entries: Entry[];
  // vBars: Set<number>;
  // hBars: Set<number>;
}

export default function Grid() {
  const [gridSize, setGridSize] = useState({ width: 15, height: 15 })
  const gridWidth = 15
  const gridHeight = 15

  const cells = new Array<ReactNode>()

  return (
    <div
      style={{
        display: "block",
        width: "500px",
        height: "500px",
        backgroundColor: "gray",
      }}
    >
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: true }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
      <Cell {...{ selected: false }} />
    </div>
  )
}
