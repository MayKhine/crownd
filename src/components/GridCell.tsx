import { GridCellType } from "./Board"

type GridCellProps = {
  width?: string
  cellData: GridCellType
  cellClick: (cell: GridCellType, clickType: string) => void
  invalid: boolean
}

export const GridCell = ({
  width,
  cellData,
  cellClick,
  invalid,
}: GridCellProps) => {
  const style: React.CSSProperties = {
    width: width ? width : "5rem",
    maxWidth: "5rem",
    height: width ? width : "5rem",
    backgroundColor: invalid
      ? "red"
      : cellData.color
      ? cellData.color
      : "lightyellow",
    border: "1px solid black",
    boxSizing: "border-box",
    display: "flex",
    cursor: "pointer",
  }

  return (
    <div
      style={{ ...style }}
      onClick={() => {
        cellClick(cellData, "left")
      }}
      onContextMenu={(e: React.MouseEvent) => {
        e.preventDefault()
        cellClick(cellData, "right")
      }}
    >
      {/* R: {cellData.row}
      C: {cellData.col} */}
      {cellData.user}
      {invalid ? "Invalid" : ""}
    </div>
  )
}
