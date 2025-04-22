import { useState } from "react"
import { Board } from "./components/Board"
import { Header } from "./components/Header"

export const App = () => {
  const colorArr = [
    "#ff99c8",
    "#fcf6bd",
    "#d0f4de",
    "#a9def9",
    "#e4c1f9",
    "#c8b6ff",
    "#ffdab9",
  ]

  const [gameSize, setGameSize] = useState(5)

  const changeGameSize = (size: string) => {
    console.log("game size called")
    if (size == "small") {
      setGameSize(3)
    }

    if (size == "med") {
      setGameSize(5)
    }

    if (size == "large") {
      setGameSize(7)
    }
  }
  return (
    <div style={{ ...pageContainerStyle }}>
      <Header />
      <div>
        <Board
          gameSize={gameSize}
          colorArr={colorArr}
          changeGameSize={changeGameSize}
        />
      </div>
    </div>
  )
}

const pageContainerStyle: React.CSSProperties = {
  backgroundColor: "#0b2545",
  width: "100%",
  minHeight: "100vh",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "2rem",
  paddingBottom: "2rem",
  boxSizing: "border-box",
}
