import { useContext, useState } from "react"

export interface CellProps {
  selected: boolean
  rowIndex: number
  columnIndex: number
  sizePercent: string
}

// TODO(scooternew): Set default props.
export default function Cell(props: CellProps) {
  const [isBlock, setIsBlock] = useState(false)
  const handleKeyEvent = (e: React.KeyboardEvent<HTMLElement>) => {
    console.log(e)
    if (e.key == "." && props.selected) {
      setIsBlock(!isBlock)
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
        backgroundColor: isBlock
          ? "darkgray"
          : props.selected
          ? "blue"
          : "white",
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
