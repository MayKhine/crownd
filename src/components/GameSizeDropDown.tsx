import { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"

type GameSizeDropDownProps = {
  changeGameSize: (size: number) => void
}

export const GameSizeDropDown = ({ changeGameSize }: GameSizeDropDownProps) => {
  const [selectGameSize, setSelectGameSize] = useState("med")
  const [dropDown, setDropDown] = useState(false)
  return (
    <div
      style={{ ...containerStyle }}
      onMouseLeave={() => {
        setDropDown(false)
      }}
    >
      <button
        style={{ ...buttonStyle }}
        onMouseEnter={() => {
          setDropDown(true)
        }}
      >
        {selectGameSize}
        <MdKeyboardArrowDown />
      </button>

      {dropDown && (
        <div style={{ ...dropdownStyle }}>
          <button
            style={{ ...dropdownButtonStyle }}
            onClick={() => {
              changeGameSize(3)
              setSelectGameSize("small")
              setDropDown(false)
            }}
          >
            small
          </button>
          <button
            style={{ ...dropdownButtonStyle }}
            onClick={() => {
              changeGameSize(5)
              setSelectGameSize("med")
              setDropDown(false)
            }}
          >
            med
          </button>
          <button
            style={{ ...dropdownButtonStyle }}
            onClick={() => {
              changeGameSize(7)
              setSelectGameSize("large")
              setDropDown(false)
            }}
          >
            large
          </button>
        </div>
      )}
    </div>
  )
}

const containerStyle: React.CSSProperties = {}

const buttonStyle: React.CSSProperties = {
  backgroundColor: "pink",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: ".2rem",
  padding: ".3rem",
  paddingLeft: ".7rem",
  paddingRight: ".7rem",
  cursor: "pointer",
  border: "1px solid white",
  borderRadius: ".5rem",
  justifySelf: "center",
  fontSize: "1rem",
  width: "5rem",
}

const dropdownStyle: React.CSSProperties = {
  zIndex: "2",
  position: "absolute",
  backgroundColor: "pink",
  fontSize: "1rem",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: ".5rem",
  padding: ".5rem",
  // boxSizing: "content-box",
  boxSizing: "border-box",
  gap: ".5rem",
}

const dropdownButtonStyle: React.CSSProperties = {
  border: "0px",
  fontSize: "1rem",
  width: "100%",
  textAlign: "start",
  backgroundColor: "pink",
  cursor: "pointer",
}
