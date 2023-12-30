import Grid from "./Grid"

export default function Crossword() {
  console.log("Creating crossword window...")
  return (
    <div
      style={{
        paddingLeft: "25px",
        paddingTop: "25px",
        width: "700px",
        height: "600px",
        backgroundColor: "gray",
      }}
    >
      <Grid />
      Grid size will be adjustable here.
    </div>
  )
}
