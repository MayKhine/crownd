import { useState } from "react"
import { Grid } from "./Grid"

const createGameGridArr = (numOfCol: number) => {
  const grid = Array.from({ length: numOfCol }, () =>
    new Array(numOfCol).fill(".")
  )
  return grid
}

const getRandomNumber = (maxNum: number) => {
  return Math.floor(Math.random() * maxNum)
}

const getRandomNumberUnique = (maxNum: number, picked: Set<number>) => {
  let randomNum
  do {
    randomNum = Math.floor(Math.random() * maxNum)
  } while (picked.has(randomNum)) // If picked, retry

  picked.add(randomNum) // Mark as picked
  return randomNum
}

const generateXonGridArr = (gridArr: Array<Array<string>>) => {
  const pickedCols = new Set<number>() // Keep track of picked columns

  for (let i = 0; i < gridArr.length; i++) {
    const col = getRandomNumberUnique(gridArr.length, pickedCols)
    gridArr[i][col] = "x"
  }
}

export const Board = () => {
  const initialGridArr = createGameGridArr(5)
  generateXonGridArr(initialGridArr)

  const [gameGridArr, setGameGridArr] = useState(initialGridArr)

  return (
    <div>
      <Grid rows={gameGridArr} />
    </div>
  )
}
