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

  return (
    <div style={{ ...pageContainerStyle }}>
      <Header />
      <div>
        <Board gameSize={5} colorArr={colorArr} />
      </div>
    </div>
  )
}

const pageContainerStyle: React.CSSProperties = {
  // backgroundColor: "#0b2545",
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
