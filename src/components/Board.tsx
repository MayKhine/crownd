import { useEffect, useState } from "react"
import { Grid } from "./Grid"
import { Popup } from "./Popup"
import { WinCard } from "./WinCard"
import { MdRestartAlt } from "react-icons/md"
import { FiClock } from "react-icons/fi"
import { formatTime } from "../helperFunctions"
import { HowToCard } from "./HowToCard"
import { AiOutlineQuestion } from "react-icons/ai"
import { GameSizeDropDown } from "./GameSizeDropDown"

export type GridCellType = {
  row: number
  col: number
  value: string
  crown?: boolean
  color?: string
  user?: string
}

const colorArr = [
  "#ff99c8",
  "#fcf6bd",
  "#d0f4de",
  "#a9def9",
  "#c8b6ff",
  "#ffdab9",
  "#FEDBFF",
]

const createGameGridArr = (gameSize: number, value: string) => {
  const grid = []
  for (let row = 0; row < gameSize; row++) {
    let rowArr = []
    for (let col = 0; col < gameSize; col++) {
      rowArr.push({ row: row, col: col, value: value, user: "" })
    }
    grid.push(rowArr)
    rowArr = []
  }

  return grid
}

const isDiagonallyTouching = (prevCol: number, curCol: number) => {
  return Math.abs(prevCol - curCol) == 1 ? true : false
}

const getRandomNumberUnique = (
  maxNum: number,
  picked: Set<number>,
  prevCol: number
) => {
  let attempts = 0
  const MAX_ATTEMPTS = 100
  let randomNum
  do {
    randomNum = Math.floor(Math.random() * maxNum)
    attempts++
    if (attempts > MAX_ATTEMPTS) {
      return "reset"
    }
  } while (picked.has(randomNum) || isDiagonallyTouching(prevCol, randomNum)) // If picked, retry
  // prevCol = randomNum
  picked.add(randomNum) // Mark as picked
  return randomNum
}

const generatePuzzleGridArr = (
  gridArr: Array<Array<GridCellType>>,
  colorArr: Array<string>
) => {
  let pickedCols = new Set<number>() // Keep track of picked columns
  let puzzleBlockArr = []
  let prevCol: number = -999

  for (let i = 0; i < gridArr.length; i++) {
    const col = getRandomNumberUnique(gridArr.length, pickedCols, prevCol)
    if (col === "reset") {
      pickedCols = new Set<number>()
      puzzleBlockArr = []
      i = -1
      gridArr.forEach((row) => {
        row.forEach((cell) => {
          cell.value = "."
        })
      })
    } else {
      gridArr[i][col].value = "x"
      gridArr[i][col].color = colorArr[i]
      prevCol = col
      const puzzleBlock = {
        row: i,
        col: col,
        value: "x",
        crown: true,
        color: colorArr[i],
      }
      puzzleBlockArr.push([puzzleBlock])
    }
  }

  return puzzleBlockArr
}

const getRandomSide = () => {
  const randomSidesArr = [
    { position: "row", value: -1 },
    { position: "row", value: 1 },
    { position: "col", value: -1 },
    { position: "col", value: 1 },
  ]
  return randomSidesArr[Math.floor(Math.random() * 4)]
}

const getCellPositionToAttachToCurCell = (
  curCell: GridCellType,
  initialGridArr: Array<Array<GridCellType>>
) => {
  const randomPosition = getRandomSide()

  //check if it is valid to gorw
  if (randomPosition.position == "row") {
    const updatedRow = curCell.row + randomPosition.value
    if (
      updatedRow >= 0 &&
      updatedRow < initialGridArr.length &&
      initialGridArr[updatedRow][curCell.col].value == "."
    ) {
      return { col: curCell.col, row: updatedRow }
    }
  }

  if (randomPosition.position == "col") {
    const updatedCol = curCell.col + randomPosition.value
    if (
      updatedCol >= 0 &&
      updatedCol < initialGridArr.length &&
      initialGridArr[curCell.row][updatedCol].value == "."
    ) {
      return { col: updatedCol, row: curCell.row }
    }
  }

  return { col: null, row: null }
}

const createPuzzleBlocks = (
  puzzleGridArr: Array<Array<GridCellType>>,
  initialGridArr: Array<Array<GridCellType>>,
  gameSize: number
) => {
  let puzzleSize = puzzleGridArr.length
  const gridSize = gameSize * gameSize

  for (let i = 0; i < puzzleGridArr.length; i++) {
    let newCellFlag = false
    let newCellPosition

    do {
      newCellPosition = getCellPositionToAttachToCurCell(
        puzzleGridArr[i][0],
        initialGridArr
      )
      if (newCellPosition.col !== null && newCellPosition.row !== null) {
        newCellFlag = true
      }
    } while (newCellFlag == false)

    if (newCellPosition.col !== null && newCellPosition.row !== null) {
      const newCell = {
        col: newCellPosition.col,
        row: newCellPosition.row,
        value: ".",
        color: puzzleGridArr[i][0].color,
      }
      puzzleGridArr[i].push(newCell)
      initialGridArr[newCellPosition.row][newCellPosition.col].value = "puzzle"
      initialGridArr[newCellPosition.row][newCellPosition.col].color =
        newCell.color

      puzzleSize += 1
    }
  }

  while (puzzleSize < gridSize + 1) {
    for (let i = 0; i < puzzleGridArr.length; i++) {
      // get a random cell from
      const randomCell =
        puzzleGridArr[i][Math.floor(Math.random() * puzzleGridArr[i].length)]

      const newCellPosition = getCellPositionToAttachToCurCell(
        randomCell,
        initialGridArr
      )

      if (
        newCellPosition.col !== null &&
        newCellPosition.row !== null &&
        puzzleSize < gridSize + 1
      ) {
        const newCell = {
          col: newCellPosition.col,
          row: newCellPosition.row,
          value: ".",
          color: puzzleGridArr[i][0].color,
        }
        puzzleGridArr[i].push(newCell)
        initialGridArr[newCellPosition.row][newCellPosition.col].value =
          "puzzle"
        initialGridArr[newCellPosition.row][newCellPosition.col].color =
          newCell.color

        puzzleSize += 1
        if (puzzleSize == gridSize) return
      }
    }
  }
}

// const playerCrownsCount = (playerArr: Array<GridCellType>) => {
//   let total = 0
//   playerArr.forEach((cell) => (cell.value == "Crown" ? (total += 1) : total))
//   return total
// }

// const checkPlayerWin = (playerCrownsArr: Array<GridCellType>) => {
//   //check if there's more than one crown on each row , each col and diagonal
//   const rowCheck = checkOnePerRow(playerCrownsArr)
//   const colCheck = checkOnePerCol(playerCrownsArr)
//   const puzzleBlockCheck = checkOnePerPuzzleBlock(playerCrownsArr)
//   const diagonalCheck = checkDiagonalCrowns(playerCrownsArr)

//   if (rowCheck && colCheck && puzzleBlockCheck && diagonalCheck) {
//     return true
//   } else {
//     return false
//   }

// }

// const checkOnePerRow = (playerCrownsArr: Array<GridCellType>) => {
//   const rows = new Set()
//   for (let i = 0; i < playerCrownsArr.length; i++) {
//     const cell = playerCrownsArr[i]
//     if (rows.has(cell.row)) return false
//     rows.add(cell.row)
//   }
//   return true
// }

// const checkOnePerCol = (playerCrownsArr: Array<GridCellType>) => {
//   const cols = new Set()
//   for (let i = 0; i < playerCrownsArr.length; i++) {
//     const cell = playerCrownsArr[i]
//     if (cols.has(cell.col)) return false
//     cols.add(cell.col)
//   }
//   return true
// }

// const checkOnePerPuzzleBlock = (playerCrownsArr: Array<GridCellType>) => {
//   const colors = new Set()
//   for (let i = 0; i < playerCrownsArr.length; i++) {
//     const cell = playerCrownsArr[i]
//     if (colors.has(cell.color)) return false
//     colors.add(cell.color)
//   }

//   return true
// }

// const checkDiagonalCrowns = (playerCrownsArr: Array<GridCellType>) => {
//   const crownPositions = new Set(
//     playerCrownsArr.map((cell) => `${cell.row},${cell.col}`)
//   )

//   const directions = [
//     [-1, -1],
//     [-1, 0],
//     [-1, 1],
//     [0, -1],
//     [0, 1],
//     [1, -1],
//     [1, 0],
//     [1, 1],
//   ]

//   for (let i = 0; i < playerCrownsArr.length; i++) {
//     const { row, col } = playerCrownsArr[i]

//     // Check all 8 directions around the crown

//     for (let x = 0; x < directions.length; x++) {
//       const [dr, dc] = directions[x]
//       const neighborKey = `${row + dr},${col + dc}`
//       if (crownPositions.has(neighborKey)) {
//         return false
//       }
//     }
//   }

//   return true
// }

const getInvalidCrownPositions = (playerCrownsArr: GridCellType[]) => {
  const invalid = new Set<string>()

  const rowMap = new Map<number, string>()
  const colMap = new Map<number, string>()
  const colorMap = new Map<string, string>()
  const crownPositions = new Set(
    playerCrownsArr.map((cell) => `${cell.row},${cell.col}`)
  )

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  for (const cell of playerCrownsArr) {
    const key = `${cell.row},${cell.col}`

    // Diagonal and adjacent check
    for (const [dr, dc] of directions) {
      const neighborKey = `${cell.row + dr},${cell.col + dc}`
      if (crownPositions.has(neighborKey)) {
        invalid.add(key)
        break
      }
    }

    if (!rowMap.has(cell.row)) {
      rowMap.set(cell.row, key)
    } else {
      invalid.add(key)
      invalid.add(rowMap.get(cell.row)!)
    }

    if (!colMap.has(cell.col)) {
      colMap.set(cell.col, key)
    } else {
      invalid.add(key)
      invalid.add(colMap.get(cell.col)!)
    }

    if (!colorMap.has(cell.color!)) {
      colorMap.set(cell.color!, key)
    } else {
      invalid.add(key)
      invalid.add(colorMap.get(cell.color!)!)
    }
  }

  return invalid
}

const cellExists = (
  arr: { row: number; col: number }[],
  cell: { row: number; col: number }
) => {
  const result = arr.some(
    (item) => item.row === cell.row && item.col === cell.col
  )
  console.log("CEll exists: ", result)
  return result
}

export const Board = () => {
  // x: Column
  // y: Row
  const [gameSize, setGameSize] = useState(5)

  const initialGridArr = createGameGridArr(gameSize, ".") //fill with .
  const puzzleGridArr = generatePuzzleGridArr(initialGridArr, colorArr)
  createPuzzleBlocks(puzzleGridArr, initialGridArr, gameSize)
  const [gameGridArr, setGameGridArr] = useState(initialGridArr)
  const [playerGridArr, setPlayerGridArr] = useState<
    Array<{ row: number; col: number; value: string; color?: string }>
  >([])
  const [invalidCrownsPosition, setInvalidCrownPosition] =
    useState<Set<string>>()

  const [toggleWin, setToggleWin] = useState(false)
  const [toggleRestart, setToggleRestart] = useState(false)
  const [startTimer, setStartTimer] = useState(false)
  const [time, setTimeSec] = useState(0)
  const [toggleHowTo, setToggleHowTo] = useState(false)

  useEffect(() => {
    const playerCrowns = playerGridArr.filter((cell) => cell.value === "Crown")
    const invalidPositions = getInvalidCrownPositions(playerCrowns)

    if (playerCrowns.length === gameSize && invalidPositions.size === 0) {
      setToggleWin(true)
      setStartTimer(false)
    } else {
      setToggleWin(false)
    }

    setInvalidCrownPosition(invalidPositions)
  }, [playerGridArr])

  useEffect(() => {
    const initialGridArr = createGameGridArr(gameSize, ".") //fill with .
    const puzzleGridArr = generatePuzzleGridArr(initialGridArr, colorArr)
    createPuzzleBlocks(puzzleGridArr, initialGridArr, gameSize)

    setGameGridArr(initialGridArr)
    setPlayerGridArr([])
    setToggleWin(false)
    setInvalidCrownPosition(new Set<string>())
    setStartTimer(false) //stop the timer
    setTimeSec(0) // reset the time
  }, [toggleRestart, gameSize])

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>

    if (startTimer) {
      timer = setInterval(() => {
        setTimeSec((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [startTimer])

  const cellClick = (cell: GridCellType, clickType: string) => {
    if (!startTimer) {
      setStartTimer(true)
    }
    // left click: Crown
    if (clickType == "left") {
      // update the invalid set

      setGameGridArr((prevData) =>
        prevData.map((row, i) =>
          row.map((cellItem, x) => {
            if (i === cell.row && x === cell.col && cell.user == "Crown") {
              return { ...cellItem, user: "" }
            }

            if (i === cell.row && x === cell.col && cell.user != "Crown") {
              return { ...cellItem, user: "Crown" }
            }
            return cellItem
          })
        )
      )

      setPlayerGridArr((prevData) => {
        const exists = prevData.some(
          (item) => item.row === cell.row && item.col === cell.col
        )

        if (cell.user == "Crown") {
          return prevData.filter(
            (item) => !(item.row == cell.row && item.col == cell.col)
          )
        } else {
          if (exists) {
            return prevData.map((item) =>
              item.row === cell.row && item.col === cell.col
                ? { ...item, value: "Crown", color: cell.color }
                : item
            )
          } else {
            return [
              ...prevData,
              {
                row: cell.row,
                col: cell.col,
                value: "Crown",
                color: cell.color,
              },
            ]
          }
        }
      })

      //check invalid after every crown placement
      const playerCrownsArr = playerGridArr.filter(
        (cell) => cell.value == "Crown"
      )

      let updatedInvalidPositions = new Set<string>()
      // filter it if cell is also in the crown
      if (cellExists(playerCrownsArr, cell)) {
        const playerCrownsArr2 = playerCrownsArr.filter(
          (item) => !(item.row === cell.row && item.col === cell.col)
        )

        updatedInvalidPositions = getInvalidCrownPositions(playerCrownsArr2)

        setInvalidCrownPosition(updatedInvalidPositions)
      } else {
        // add the cell to the array
        updatedInvalidPositions = getInvalidCrownPositions([
          ...playerCrownsArr,
          cell,
        ])

        setInvalidCrownPosition(updatedInvalidPositions)
      }
    }

    // right click: X
    if (clickType == "right") {
      setGameGridArr((prevData) =>
        prevData.map((row, i) =>
          row.map((cellItem, x) => {
            if (i === cell.row && x === cell.col && cell.user == "X") {
              return { ...cellItem, user: "" }
            }
            if (i === cell.row && x === cell.col && cell.user != "X") {
              return { ...cellItem, user: "X" }
            }
            return cellItem
          })
        )
      )

      setPlayerGridArr((prevData) => {
        const exists = prevData.some(
          (item) => item.row === cell.row && item.col === cell.col
        )

        if (cell.user == "X") {
          return prevData.filter(
            (item) => !(item.row == cell.row && item.col == cell.col)
          )
        } else {
          if (exists) {
            return prevData.map((item) =>
              item.row === cell.row && item.col === cell.col
                ? { ...item, value: "X" }
                : item
            )
          } else {
            return [...prevData, { row: cell.row, col: cell.col, value: "X" }]
          }
        }
      })

      // also check if player marks a crown to an X
      const playerCrownsArr = playerGridArr.filter(
        (cell) => cell.value == "Crown"
      )
      let updatedInvalidPositions = new Set<string>()

      if (cellExists(playerCrownsArr, cell)) {
        const playerCrownsArr2 = playerCrownsArr.filter(
          (item) => !(item.row === cell.row && item.col === cell.col)
        )
        updatedInvalidPositions = getInvalidCrownPositions(playerCrownsArr2)
        setInvalidCrownPosition(updatedInvalidPositions)
      }
    }
  }

  const updateGameSize = (newGameSize: number) => {
    setGameSize(newGameSize)
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      {toggleWin && (
        <Popup
          closePopup={() => {
            setToggleWin(false)
          }}
        >
          <div
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
            }}
          >
            <WinCard
              closePopup={() => {
                setToggleWin(false)
              }}
              time={time}
            />
          </div>
        </Popup>
      )}

      {toggleHowTo && (
        <Popup
          closePopup={() => {
            setToggleHowTo(false)
          }}
        >
          <div
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
            }}
          >
            <HowToCard
              closePopup={() => {
                setToggleHowTo(false)
              }}
            />
          </div>
        </Popup>
      )}

      <div style={{ boxSizing: "border-box", width: "100%" }}>
        <div
          style={{
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingBottom: ".5rem",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".2rem",
              width: "6rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              <FiClock color="white" size={25} /> <div>{formatTime(time)}</div>
            </div>
          </div>

          <div style={{ width: "6rem" }}>
            <GameSizeDropDown changeGameSize={updateGameSize} />
          </div>
          <div
            style={{
              height: "100%",
              gap: ".2rem",
              display: "flex",
              flexDirection: "column",
              alignContent: "flex-end",
              alignItems: "flex-end",
              width: "6rem",
            }}
          >
            <div
              className="tooltip"
              style={{
                display: "flex",
                cursor: "pointer",
              }}
            >
              <AiOutlineQuestion
                color="white"
                size={30}
                onClick={() => {
                  setToggleHowTo(true)
                }}
              />
              {/* <span className="tooltiptext"> How to play</span> */}
            </div>
            <div className="tooltip">
              <MdRestartAlt
                style={{ cursor: "pointer" }}
                color="white"
                size={30}
                onClick={() => {
                  console.log("restart the game")
                  setToggleRestart(!toggleRestart)
                }}
              ></MdRestartAlt>
              {/* <span className="tooltiptext">Restart</span> */}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Grid
          grid={gameGridArr}
          cellClick={cellClick}
          invalidCrownsPosition={invalidCrownsPosition ?? new Set()}
          gameSize={gameSize}
        />
      </div>
    </div>
  )
}
