import { useContext, useState } from "react"

export interface CellProps {
  selected: boolean
  rowIndex: number
  columnIndex: number
  sizePercent: string
  blocked: boolean
  highlighted: boolean
  displayText: string
}

// TODO(scooternew): Set default props.
export default function Cell(props: CellProps) {
  const createBackgroundColor = () => {
    if (props.selected) {
      if (props.highlighted) {
        return "gold"
      }
      return props.blocked ? "darkblue" : "blue"
    } else {
      if (props.highlighted) {
        return "palegoldenrod"
      }
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
      <div
        className="highlight"
        // style={{ display: "flex", background: "green" }} // TODO(scooternew): Fix this.
      >
        <div className="internalCellText">
          [{props.rowIndex}, {props.columnIndex}]
          <br />
          <span
            style={{
              display: "flex",
              textAlign: "center",
              fontWeight: "bolder",
              fontSize: "1.5em",
              color: "#BBBBBB",
            }}
          >
            {props.displayText}
          </span>
        </div>
      </div>
    </div>
  )
}
