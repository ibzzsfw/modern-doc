const getSexMF = (sex: 'ชาย' | 'หญิง'): 'm' | 'f' => {
  switch (sex) {
    case 'ชาย':
      return 'm'
    case 'หญิง':
      return 'f'
  }
}

export default getSexMF
