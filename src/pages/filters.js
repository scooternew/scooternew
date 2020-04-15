import React from "react"
import { Link } from "gatsby"

import AudioPlayer from "../components/audio-player"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const FiltersPage = () => (
  <Layout>
    <SEO title="Filters" />
    <h2>Filters</h2>
    <p>Some exploration of basic audio processing using the HTML5 WebAudio API.</p>
    <AudioPlayer />
  </Layout>
)

export default FiltersPage
