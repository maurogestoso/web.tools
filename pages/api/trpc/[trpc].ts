import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { z } from "zod"
import {
  fetchIpGeolocationData,
  IpGeoloactionAPIError,
  IpGeolocationData,
} from "../../../utils/ipGeoloaction"

export const appRouter = trpc
  .router()
  .query("hello", {
    input: z.object({ text: z.string().nullish() }).nullish(),
    resolve({ input }) {
      return { greeting: `hello ${input?.text ?? "world"}` }
    },
  })
  .query("ip-geolocation", {
    input: z.object({ ip: z.string().nullish() }),
    async resolve({ input }) {
      if (!input.ip) {
        return null
      }

      const response = await fetchIpGeolocationData(input.ip)

      if (!response.ok) {
        const errorData: IpGeoloactionAPIError = await response.json()

        const errorCode =
          errorData.error.code === 400 ? "BAD_REQUEST" : "INTERNAL_SERVER_ERROR"

        throw new trpc.TRPCError({
          message: errorData.error.message,
          code: errorCode,
        })
      }

      return (await response.json()) as IpGeolocationData
    },
  })

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
})
