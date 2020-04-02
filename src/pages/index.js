import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h2 style={{textAlign: `center`}}>Hi - I'm Scott. People often call me Scotty.</h2>
    <p>I'm a professional software developer based in Queens, New York. I spent the past 6 years at Google, specializing
        in building highly concurrent Android applications with a focus on speech recognition, location acquisition,
        and user context.
    </p>
    <p>More to come soon. Stay tuned!</p>
    <div style={{ maxWidth: `500px`, marginBottom: `1.45rem`, margin: `0 auto`}}>
      <Image />
    </div>
  </Layout>
)

export default IndexPage
