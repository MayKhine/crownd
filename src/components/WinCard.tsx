type WinCardProps = {
  closePopup: () => void
  time?: string
}
export const WinCard = ({ closePopup, time }: WinCardProps) => {
  return (
    <div style={{ ...winCardStyle }} onClick={closePopup}>
      You win
      {time}
    </div>
  )
}

const winCardStyle: React.CSSProperties = {
  backgroundColor: "pink",
  zIndex: "2",
  width: "15rem",
  height: "10rem",
  borderRadius: ".5rem",
  padding: "1rem",
  boxSizing: "border-box",
}
