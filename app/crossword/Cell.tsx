import { useContext, useState } from "react"

interface CellProps {
  selected: boolean
  rowIndex: number
  columnIndex: number
  sizePercent: string
}

// TODO(scooternew): Set default props.
export default function Cell(props: CellProps) {
  return (
    <div
      style={{
        width: props.sizePercent,
        paddingBottom: props.sizePercent,
        borderTop: "1px solid gray",
        borderRight: "1px solid gray",
        lineHeight: "1.5",
        float: "left",
        position: "relative",
        margin: 0,
        overflow: "hidden",
        containerType: "size",
        backgroundColor: props.selected ? "blue" : "white",
        color: "darkGray",
        fontSize: "0.7em",
      }}
    >
      <div className="internalCellText">
        [{props.rowIndex}, {props.columnIndex}]
      </div>
    </div>
  )
}
