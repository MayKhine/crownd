import { IoCloseCircleOutline } from "react-icons/io5"
import { formatTime } from "../helperFunctions"
type WinCardProps = {
  closePopup: () => void
  time: number
}
export const WinCard = ({ closePopup, time }: WinCardProps) => {
  return (
    <div style={{ ...winCardStyle }}>
      <IoCloseCircleOutline
        onClick={closePopup}
        style={{ ...closeIconStyle }}
        size={30}
      />

      <div style={{ ...textContainerStyle }}>
        <div> You win! </div>
        <div> Solve Time: {formatTime(time)}</div>
      </div>
    </div>
  )
}

const winCardStyle: React.CSSProperties = {
  backgroundColor: "pink",
  zIndex: "2",
  width: "15rem",
  height: "10rem",
  borderRadius: "1rem",
  padding: "1rem",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
}

const closeIconStyle: React.CSSProperties = {
  cursor: "pointer",
  alignSelf: "flex-end",
}

const textContainerStyle: React.CSSProperties = {
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // backgroundColor: "red",
}
