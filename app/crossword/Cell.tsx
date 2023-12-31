import { useState } from "react"

interface CellProps {
  selected: boolean
  widthPercent: string
  paddingBottomPercent: string
  rowIndex: number
  columnIndex: number
  // TODO(scooternew): Store style data separately.
  // styleProps: { number: number }
}

// TODO(scooternew): Set default props.
export default function Cell(props: CellProps) {
  const [isBlock, setIsBlock] = useState(false)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    console.log(event)
    if (event.key === ".") {
      console.log(
        "Cell level event handler - period key was pressed on cell [" +
          props.rowIndex +
          ", " +
          props.columnIndex
      )
      // setIsBlock(!isBlock)
    }
  }

  const selectBackgroundColor = () => {
    // if (isBlock) {
    //   return "black"
    // }
    return props.selected ? "blue" : "white"
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      style={{
        width: props.widthPercent,
        paddingBottom: props.paddingBottomPercent,
        borderTop: "1px solid gray",
        borderRight: "1px solid gray",
        lineHeight: "1.5",
        float: "left",
        position: "relative",
        margin: 0,
        overflow: "hidden",
        containerType: "size",
        backgroundColor: selectBackgroundColor(),
        color: "darkGray",
        fontSize: "0.7em",
      }}
      tabIndex={0} // Ensures this can respond to key events.
    >
      <div className="internalCellText">
        [{props.rowIndex}, {props.columnIndex}]
      </div>
    </div>
  )
}
