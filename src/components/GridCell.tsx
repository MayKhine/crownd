type GridCellProps = {
  width?: string
  bgColor?: string
  value?: string
}

export const GridCell = ({ width, bgColor, value }: GridCellProps) => {
  const style: React.CSSProperties = {
    width: width ? width : "5rem",
    height: width ? width : "5rem",
    backgroundColor: bgColor ? bgColor : "yellow",
    border: "1px solid black",
    boxSizing: "border-box",
  }

  return <div style={{ ...style }}> {value}</div>
}
