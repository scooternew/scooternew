import { useContext, useState } from "react"

export interface CellProps {
  selected: boolean
  rowIndex: number
  columnIndex: number
  sizePercent: string
  blocked: boolean
}

// TODO(scooternew): Set default props.
export default function Cell(props: CellProps) {
  const createBackgroundColor = () => {
    if (props.selected) {
      return props.blocked ? "darkblue" : "blue"
    } else {
      return props.blocked ? "black" : "white"
    }
  }

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
        backgroundColor: createBackgroundColor(),
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
