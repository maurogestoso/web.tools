import { NextPage } from "next";
import React from "react";
import {
  fetchIpGeolocationData,
  IpGeoloactionAPIError,
  IpGeolocationData,
} from "../lib/ipGeoloaction";

const IpGeolocation: NextPage = () => {
  const [geolocationData, setGeolocationData] =
    React.useState<IpGeolocationData>();
  const [error, setError] = React.useState<IpGeoloactionAPIError>();
  const [isLoading, setIsLoading] = React.useState(false);

  async function formAction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const ipAddress = formData.get("ip-address")!;

    try {
      setIsLoading(true);
      const geoData = await fetchIpGeolocationData(ipAddress.toString());
      setGeolocationData(geoData);
    } catch (err) {
      const error = err as IpGeoloactionAPIError;
      setError(error);
    } finally {
      setIsLoading(false);
    }
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
        />
        <button
          type="submit"
          aria-busy={isLoading ? "true" : "false"}
          disabled={isLoading}
        >
          Get geolocation data
        </button>
      </form>
      {geolocationData && <pre>{JSON.stringify(geolocationData, null, 2)}</pre>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </>
  );
};

export default IpGeolocation;
