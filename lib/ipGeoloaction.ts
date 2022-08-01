import React from "react"

export const IP_PATTERN =
  "^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"

const OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_IP_GEO_API_KEY!,
    "X-RapidAPI-Host": "ip-geo-location.p.rapidapi.com",
  },
}

export function useIpGeolocation(): {
  isLoading: boolean
  error?: IpGeoloactionAPIError
  data?: IpGeolocationData
  fetchIpGeolocationData: (ipAddress: string) => void
} {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<any>()
  const [data, setData] = React.useState<IpGeolocationData>()

  async function fetchIpGeolocationData(ipAddress: string) {
    setIsLoading(true)

    const response = await fetch(
      `https://ip-geo-location.p.rapidapi.com/ip/${ipAddress}?format=json`,
      OPTIONS
    )

    if (!response.ok) {
      const error = await response.json()
      setIsLoading(false)
      setError(error)
      setData(undefined)
      return
    }

    const data: IpGeolocationData = await response.json()
    setIsLoading(false)
    setData(data)
    setError(undefined)
  }

  return { isLoading, fetchIpGeolocationData, error, data }
}

export interface IpGeoloactionAPIError {
  status: "failed"
  error: {
    code: number
    message: string
  }
}

export interface IpGeolocationData {
  ip: string
  type: string
  location: Location
  postcode: string
  area: Area
  asn: Asn
  city: City
  continent: Continent
  country: Country
  currency: Currency
  security: Security
  time: Time
  status: "success"
}

interface Location {
  latitude: number
  longitude: number
}

interface Area {
  code: string
  geonameid: number
  name: string
}

interface Asn {
  number: number
  organisation: string
}

interface City {
  geonameid: number
  name: string
  population: number
}

interface Continent {
  geonameid: number
  name: string
  code: string
}

interface Languages {
  [key: string]: string
}

interface Flag {
  file: string
  emoji: string
  unicode: string
}

interface Country {
  geonameid: number
  name: string
  code: string
  capital: string
  area_size: string
  population: number
  phone_code: string
  is_in_eu: boolean
  languages: Languages
  flag: Flag
  tld: string
}

interface Currency {
  code: string
  name: string
}

interface Security {
  is_tor: boolean
  is_proxy: boolean
  is_crawler: boolean
  is_threat: boolean
  is_thread: boolean
}

interface Time {
  timezone: string
  gtm_offset: number
  gmt_offset: number
  is_daylight_saving: boolean
  code: string
}
