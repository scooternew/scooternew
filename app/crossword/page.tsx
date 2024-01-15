"use client"

import React, { useState } from "react"
import Grid from "./Grid"

export default function Crossword() {
  console.log("Creating crossword window...")

  const handleLoginButtonClick = (event: React.MouseEvent) => {}

  const [gridLength, setGridLength] = useState(12)

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
        }}
        tabIndex={-1}
      >
        <Grid />
        Navigate w/arrow keys. Press "." to place/remove a block.
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
    </React.StrictMode>
  )
}
