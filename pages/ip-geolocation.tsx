import { NextPage } from "next";
import Link from "next/link";

const IpGeolocation: NextPage = () => {
  return (
    <>
      <h2>IP Geolocation</h2>
      <form>
        <input type="text" placeholder="Enter IP address" />
        <button type="submit">Get geolocation data</button>
      </form>
    </>
  );
};

export default IpGeolocation;
