import { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"

type GameSizeDropDownProps = {
  changeGameSize: (size: number) => void
}

export const GameSizeDropDown = ({ changeGameSize }: GameSizeDropDownProps) => {
  const [selectGameSize, setSelectGameSize] = useState("small")
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
            className="dropdownbutton"
            // style={{ ...dropdownButtonStyle }}
            onClick={() => {
              setDropDown(false)
              setSelectGameSize("small")
              changeGameSize(5)
            }}
          >
            small
          </button>
          <button
            className="dropdownbutton"
            // style={{ ...dropdownButtonStyle }}
            onClick={() => {
              setDropDown(false)
              setSelectGameSize("med")

              changeGameSize(6)
            }}
          >
            med
          </button>
          <button
            className="dropdownbutton"
            // style={{ ...dropdownButtonStyle }}
            onClick={() => {
              setDropDown(false)
              setSelectGameSize("large")

              changeGameSize(7)
            }}
          >
            large
          </button>
        </div>
      )}
    </div>
  )
}

const containerStyle: React.CSSProperties = { height: "2rem" }

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#214065",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: ".2rem",
  padding: ".3rem",
  paddingLeft: ".7rem",
  paddingRight: ".7rem",
  cursor: "pointer",
  border: "2px solid white",
  borderRadius: ".5rem",
  justifySelf: "center",
  fontSize: "1rem",
  width: "5rem",
  color: "#fdfffc",
  height: "2rem",
}

const dropdownStyle: React.CSSProperties = {
  zIndex: "2",
  position: "relative",
  backgroundColor: "#214065",
  fontSize: "1rem",
  width: "5rem",
  display: "flex",
  flexDirection: "column",
  borderRadius: ".5rem",
  padding: ".5rem",
  boxSizing: "border-box",
  gap: ".5rem",
}
