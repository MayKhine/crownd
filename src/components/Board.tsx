import { Grid } from "./Grid"

const createGameGridArr = (numOfCol: number) => {
  const row = new Array(numOfCol).fill(".")
  const grid = new Array(numOfCol).fill(row)
  return grid
}

const randomGenerateXonGrid = () => {
  //
}
export const Board = () => {
  const gameGridArr = createGameGridArr(5)

  console.log("Grid  : ", gameGridArr)
  return (
    <div>
      <Grid rows={gameGridArr} />
    </div>
  )
}
