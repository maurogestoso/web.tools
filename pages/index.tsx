import type { NextPage } from "next"
import Link from "next/link"
import { trpc } from "../utils/trpc"

const Home: NextPage = () => {
  const hello = trpc.useQuery(["hello", { text: "client" }])

  if (!hello.data) {
    return <div>Loading...</div>
  }

  return (
    <>
      <ul>
        <li>
          <Link href="/ip-geolocation">IP Geolocation</Link>
        </li>
      </ul>
      <h3>Greeting</h3>
      <p>{hello.data.greeting}</p>
    </>
  )
}

export default Home
