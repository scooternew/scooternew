// interface CellProps {
//     barRight: boolean;
//     barBottom: boolean;
//     hidden: boolean;
//     hiddenRight: boolean;
//     hiddenBottom: boolean;
//     isEnteringRebus: boolean;
//     rebusValue?: string;
//     autofill: string;
//     gridWidth: number;
//     gridHeight: number;
//     isBlock: boolean;
//     active: boolean;
//     entryCell: boolean;
//     refedCell: boolean;
//     highlightCell: boolean;
//     highlight: 'circle' | 'shade' | undefined;
//     value: string;
//     number: string;
//     row: number;
//     column: number;
//     onClick: (pos: { row: number; col: number }) => void;
//     isVerified: boolean | undefined;
//     isWrong: boolean | undefined;
//     wasRevealed: boolean | undefined;
//     cellColor?: number;
//     isOpposite: boolean;
//   }

interface CellProps {
  selected: boolean
  widthPercent: string
  paddingBottomPercent: string
}

export default function Cell(props: CellProps) {
  // Width and PaddingBottom are the grid width / row length, grid height / row height
  return (
    <div
      onKeyDown={(e) => console.log(e)}
      style={{
        width: props.widthPercent,
        paddingBottom: props.paddingBottomPercent,
        borderTop: "1px solid gray",
        borderRight: "1px solid gray",
        lineHeight: "1.5",
        // paddingBottom: "100%",
        float: "left",
        position: "relative",
        margin: 0,
        overflow: "hidden",
        containerType: "size",
        backgroundColor: props.selected ? "brown" : "white",
      }}
    ></div>
  )
}
