import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"

const Home: NextPage = () => {
  return (
    <ul>
      <li>
        <Link href="/ip-geolocation">IP Geolocation</Link>
      </li>
    </ul>
  )
}

export default Home
