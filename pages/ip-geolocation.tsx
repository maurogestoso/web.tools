import { NextPage } from "next"
import React from "react"
import { IP_PATTERN } from "../utils/ipGeoloaction"
import { trpc } from "../utils/trpc"

const IpGeolocation: NextPage = () => {
  const [ipAddress, setIpAddress] = React.useState<string>()
  const {
    isLoading,
    data: ipData,
    isError,
    error: ipError,
  } = trpc.useQuery(["ip-geolocation", { ip: ipAddress }], {
    retry: false,
  })

  console.log("🚀 ~ file: ip-geolocation.tsx ~ line 9 ~ ipData", ipData)

  async function formAction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const ipAddress = formData.get("ip-address")!

    setIpAddress(ipAddress.toString())
  }

  return (
    <>
      <h2>IP Geolocation</h2>
      <form onSubmit={formAction}>
        <input
          name="ip-address"
          type="text"
          placeholder="Enter IP address"
          required
          pattern={IP_PATTERN}
        />
        <small>For example: 23.123.12.11</small>
        <button
          type="submit"
          aria-busy={ipAddress && isLoading ? "true" : "false"}
          disabled={ipAddress && isLoading ? true : false}
        >
          Get geolocation data
        </button>
      </form>
      {ipData && (
        <section>
          <h3>
            {ipData.country.flag.emoji} {ipData.city.name}, {ipData.area.name},{" "}
            {ipData.country.name}
          </h3>
          <pre style={{ padding: 8 }}>{JSON.stringify(ipData, null, 2)}</pre>
        </section>
      )}
      {isError && <pre style={{ padding: 8 }}>{ipError.message}</pre>}
    </>
  )
}

export default IpGeolocation
