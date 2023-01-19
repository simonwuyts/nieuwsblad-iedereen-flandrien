export async function userExistsInCiam(email: string) {
  const ENDPOINT =
    'https://interactief2.nieuwsblad.be/WedstrijdCR/WedstrijdCR.aspx?ID=w_1wXmbiOeZPMl89jlDTxbU126qvQGXjwhQXVBSG4sBve8jMM2acagHcJFMPn5Yj0n1rzBV3eeVDlw4AQB&notags=1&mail='

  const result = await (
    await fetch(`${ENDPOINT}${encodeURIComponent(email)}`)
  ).text()
  return result.indexOf('NOT_FOUND') > -1 ? false : true
}

export async function getCities(zipCodeOrCity: string) {
  const ENDPOINT =
    'https://interactief2.nieuwsblad.be/WedstrijdCR/WedstrijdCR.aspx?ID=ImrsUUT17SyQumFQAEtlotww8kMSfobYJzUj3f7zkC%2Bk%2BF0SH_3jpKGWcZ0PW7gPmEzyd_e4xEVKd4&notags=1&NAME='

  if (zipCodeOrCity.length > 1) {
    const result = await (
      await fetch(`${ENDPOINT}${encodeURIComponent(zipCodeOrCity)}`)
    ).json()
    return result.cities.city
  } else {
    return []
  }
}
