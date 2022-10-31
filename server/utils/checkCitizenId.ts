const checkCitizenId = (citizenId: string): boolean => {
  let total = 0
  let iPID
  let chk
  let Validchk
  iPID = citizenId.replace(/-/g, '')
  Validchk = iPID.substr(12, 1)
  let j = 0
  let pidcut
  for (let n = 0; n < 12; n++) {
    pidcut = parseInt(iPID.substr(j, 1))
    total = total + pidcut * (13 - n)
    j++
  }

  chk = 11 - (total % 11)

  if (chk == 10) {
    chk = 0
  } else if (chk == 11) {
    chk = 1
  }
  if (chk == Validchk) {
    return true
  } else {
    return false
  }
}

export default checkCitizenId
