import type { AppProps } from "next/app"
import Layout from "../components/Layout"

import "@picocss/pico"
import { withTRPC } from "@trpc/next"
import { AppRouter } from "./api/trpc/[trpc]"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc"
    return { url }
  },
  ssr: true,
})(MyApp)
