"use client"

import React from "react"
import Grid from "./Grid"
import { GlobalGridContext, defaultGlobalGridProps } from "./GlobalGridContext"

export default function Crossword() {
  console.log("Creating crossword window...")

  const handleLoginButtonClick = (event: React.MouseEvent) => {
    console.log("Page level - login button clicked")
    console.log(event)
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
