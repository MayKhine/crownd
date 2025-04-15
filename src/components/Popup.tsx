type PopupProps = {
  children: React.ReactNode
}
export const Popup = ({ children }: PopupProps) => {
  return (
    <div>
      <div style={{ ...popupStyle }}> </div>
      {children}
    </div>
  )
}
const popupStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "100vh",
  height: "100%",
  backgroundColor: "green",
  zIndex: "1",
  left: "0",
  top: "0",
  position: "fixed",
  opacity: "20%",
}
