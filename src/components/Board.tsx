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

const getRandomSide = () => {
  const randomSidesArr = [
    { placement: "row", value: -1 },
    { placement: "row", value: 1 },
    { placement: "col", value: -1 },
    { placement: "col", value: 1 },
  ]
  return randomSidesArr[Math.floor(Math.random() * 4)]
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
  const xArr = []
  for (let i = 0; i < gridArr.length; i++) {
    const col = getRandomNumberUnique(gridArr.length, pickedCols)
    gridArr[i][col] = "x"
    xArr.push({ x: col, color: colorArr[i], xy: { x: i, y: col } })
  }

  return xArr
}

const colorArr = ["red", "blue", "pink", "white", "green"]
export const Board = () => {
  const gameSize = 5
  const initialGridArr = createGameGridArr(gameSize)
  const xArr = generateXonGridArr(initialGridArr)
  const gameGridArr = initialGridArr
  // const [gameGridArr, setGameGridArr] = useState(initialGridArr)

  const checkIsValidToGrow = (
    xLocation: { x: number; y: number },
    gridArr: Array<Array<string>>,
    randomside: { placement: string; value: number }
  ) => {
    //x
    if (randomside.placement == "row") {
      const updatedX = xLocation.x + randomside.value
      if (
        updatedX >= 0 &&
        updatedX < gridArr.length &&
        gridArr[xLocation.y][updatedX] == "."
      ) {
        return { x: updatedX, y: xLocation.y }
      }
    }

    //y
    if (randomside.placement == "col") {
      const updatedY = xLocation.y + randomside.value
      if (
        updatedY >= 0 &&
        updatedY < gridArr.length &&
        gridArr[xLocation.y][updatedY] == "."
      ) {
        return { x: xLocation.x, y: updatedY }
      }
    }

    return false
  }

  const createBlockPuzzle = () => {
    for (let i = 0; i < gameSize; i++) {
      const randomSide = getRandomSide()
      const xIndex = xArr[i].x
      const xColor = xArr[i].color
      const xPlacement = xArr[i].xy

      const updatedPlacement = checkIsValidToGrow(
        xPlacement,
        gameGridArr,
        randomSide
      )
      if (updatedPlacement !== false) {
        gameGridArr[updatedPlacement.y][updatedPlacement.x] = xColor
      }
    }
  }

  createBlockPuzzle()

  return (
    <div>
      <Grid rows={gameGridArr} />
    </div>
  )
}
