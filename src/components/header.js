import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Navbar from "./navbar"

const Header = ({ siteTitle }) => (
  <div id="header-container">
    <div id="header-main-content"
        style={{
          background: `#4f6d7a`,
        }}
    >
      <header
        style={{
          display: `flex`,
          maxWidth: `960px`, // Should match body content 
          marginLeft: `auto`,
          marginRight: `auto`,
          justifyContent: `space-between`,
          alignItems: `center`,
          padding: `0 1.0875rem`,
        }}
      >
        <div
          style={{
            maxWidth: 960,
          }}
        >
          <h1 style={{ margin: `0`, textAlign: `center` }}>
            <Link
              to="/"
              style={{
                color: `#EDFFEC`,
                textDecoration: `none`,
              }}
            >
              SN
            </Link>
          </h1>
        </div>
        <Navbar />
      </header>
    </div>
    <div id="header-footer"
      style={{
        marginBottom: `1.45rem`,
        borderBottom: `0.5em solid #5fa08d`
      }}
    >
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
