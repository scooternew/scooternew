"use client"

import React, { useState } from "react"
import Grid, { defaultGridState } from "./Grid"
import EditableClueList from "./EditableClueList"

export default function Crossword() {
  console.log("Creating crossword window...")

  const handleLoginButtonClick = (event: React.MouseEvent) => {}
  const [gridLength, setGridLength] = useState(12)
  // const [gridState, setGridState] = useState(defaultGridState)

  const handleUpdateGridLength = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e)
  }

  return (
    <React.StrictMode>
      <div
        style={{
          paddingLeft: "25px",
          paddingTop: "25px",
          width: "80%",
          height: "80%",
          backgroundColor: "gray",
          display: "flex",
        }}
        tabIndex={-1}
      >
        <div
          className="gridSection"
          style={{ display: "inline-block", width: "50%", padding: "25px" }}
        >
          <Grid />
          Navigate w/arrow keys. Press "." to place/remove a block. Type a
          letter (A-Z) on a selected cell to enter it in. Press backspace to
          delete a letter.
          <br />
          Grid size will be adjustable here.
          <div>
            <button
              onClick={handleLoginButtonClick}
              style={{ border: "2px solid red" }}
            >
              Login button goes here
            </button>
          </div>
        </div>
        <div className="clueListSection" style={{ display: "inline-block" }}>
          <EditableClueList />
        </div>
      </div>
    </React.StrictMode>
  )
}
