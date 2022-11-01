const getSexText = (sex: 'm' | 'f'): 'ชาย' | 'หญิง' => {
  switch (sex) {
    case 'm':
      return 'ชาย'
    case 'f':
      return 'หญิง'
  }
}

export default getSexText
