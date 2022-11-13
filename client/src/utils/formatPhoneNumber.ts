const withCountryCode = (phoneNumber: string): string => {
  if (phoneNumber[0] === '+') {
    return phoneNumber
  }
  return `+66${phoneNumber.slice(1)}`
}

const withoutCountryCode = (phoneNumber: string): string => {
  if (phoneNumber[0] === '+') {
    return `0${phoneNumber.slice(3)}`
  }
  return phoneNumber
}

export { withCountryCode, withoutCountryCode }
