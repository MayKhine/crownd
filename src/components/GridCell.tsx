import { GridCellType } from "./Board"

type GridCellProps = {
  width?: string
  cellData: GridCellType
  cellClick: (cell: GridCellType) => void
}

export const GridCell = ({ width, cellData, cellClick }: GridCellProps) => {
  const style: React.CSSProperties = {
    width: width ? width : "5rem",
    height: width ? width : "5rem",
    backgroundColor: cellData.color ? cellData.color : "lightyellow",
    border: "1px solid black",
    boxSizing: "border-box",
    display: "flex",
  }

  return (
    <div
      style={{ ...style }}
      onClick={() => {
        cellClick(cellData)
      }}
    >
      R: {cellData.row}
      C: {cellData.col}
    </div>
  )
}
