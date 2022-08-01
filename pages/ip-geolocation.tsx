import { NextPage } from "next"
import React from "react"
import { IP_PATTERN, useIpGeolocation } from "../lib/ipGeoloaction"

const IpGeolocation: NextPage = () => {
  const { isLoading, error, data, fetchIpGeolocationData } = useIpGeolocation()

  async function formAction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const ipAddress = formData.get("ip-address")!

    fetchIpGeolocationData(ipAddress.toString())
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
          aria-busy={isLoading ? "true" : "false"}
          disabled={isLoading}
        >
          Get geolocation data
        </button>
      </form>
      {data && (
        <pre style={{ padding: 8 }}>{JSON.stringify(data, null, 2)}</pre>
      )}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </>
  )
}

export default IpGeolocation
