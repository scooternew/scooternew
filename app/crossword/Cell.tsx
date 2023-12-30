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
}

export default function Cell(props: CellProps) {
  return (
    <div
      style={{
        width: "10%",
        paddingBottom: "10%",
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
