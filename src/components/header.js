import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Navbar from "./navbar"

const Header = ({ siteTitle }) => (
  <div id="header-container"
      style={{
        background: `#4f6d7a`,
        marginBottom: `1.45rem`,
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
          // margin: `0 auto`,
          maxWidth: 960,
          // padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: `0`, textAlign: `center` }}>
          <Link
            to="/"
            style={{
              color: `#d8e7e8`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
      <Navbar />
    </header>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
