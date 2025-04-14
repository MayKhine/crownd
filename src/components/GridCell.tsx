import { GridCellType } from "./Board"

type GridCellProps = {
  width?: string
  bgColor?: string
  cellData: GridCellType
}

export const GridCell = ({ width, bgColor, cellData }: GridCellProps) => {
  const style: React.CSSProperties = {
    width: width ? width : "5rem",
    height: width ? width : "5rem",
    backgroundColor: bgColor ? bgColor : "lightyellow",
    border: "1px solid black",
    boxSizing: "border-box",
    display: "flex",
  }

  return (
    <div style={{ ...style }}>
      R: {cellData.row}
      C: {cellData.col}
      V: {cellData.value}
    </div>
  )
}
