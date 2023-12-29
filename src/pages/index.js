import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h2 style={{textAlign: `center`}}>Hi - I&#39;m Scott.</h2>
    <p>I&#39;m a professional software developer based in Queens, New York.
    </p>
    <p>More to come soon!</p>
  </Layout>
)

export default IndexPage
