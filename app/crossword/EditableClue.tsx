export enum EditableClueDirection {
  Horizontal,
  Vertical,
}

export interface EditableClueProps {
  clueText: string
  clueNumber: number
  clueDirection: EditableClueDirection
  clueCellRowIndex: number
  clueCellColumnIndex: number
}

export default function EditableClue() {
  return <></>
}
