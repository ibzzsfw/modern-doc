import {
  Box,
  Text,
  Flex,
  Button,
  Heading,
  HStack,
  Input,
  FormControl,
  FormLabel,
  Select,
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useGeneratedFileStore } from "@stores/GeneratedFile"

const Form = () => {

  const { generatedFile, generatedFileField } = useGeneratedFileStore()
  const [percent, setPercent] = useState<number>(0.40)

  console.log(generatedFileField)

  let formLayout = {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
    width: '70%',
    maxHeight: '768px',
    margin: 'auto',
  }

  let progress = {
    width: '320px',
    height: '16px',
  }

  let abstractBar = {
    // smooth change width transition
    transition: 'width 0.5s',
  }

  let a = {
    ...abstractBar,
    width: `calc(${percent} * 100%)`,
    // bg color purple
    backgroundColor: '#6B46C1',
  }

  let b = {
    ...abstractBar,
    width: `calc(${1 - percent} * 100%)`,
    // bg color gray
    backgroundColor: '#E5E7EB',
  }

  let buttomSection = {
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  let progressSection = {
    columnGap: '1rem',
    height: 'fit-content',
  }

  let formBox = {
    flexDirection: 'column',
    padding: '0 60% 0 2rem',
    rowGap: '1rem',
    maxHeight: '530px',
    overflow: 'auto',
  }

  let topSection = {
    flexDirection: 'column',
    rowGap: '2rem',
    backgroundColor: 'white',
    padding: '3rem',
    borderRadius: '8px',
  }

  return (
    <Box sx={formLayout}>
      <Flex sx={topSection}>
        <Box>
          <Heading as='h2' size='lg'>ข้อมูลที่จำเป็น</Heading>
          <Text as='p'>ข้อมูลเหล่านี้จะถูกนำไปบันทึกในเอกสารที่ระบบจะสร้างขึ้น</Text>
          <Text as='p' color='gray'>ท่านสามารถตรวจสอบข้อมูลอีกครั้งเมื่อกรอกข้อมูลที่จำเป็นครบถ้วน</Text>
        </Box>
        <Flex sx={formBox}>
          {/* <form> */}
          <FormControl id='text1' isRequired>
            <FormLabel>text</FormLabel>
            <Input id='1' placeholder='text' type='text' />
          </FormControl>
          <FormControl id='number1' isRequired>
            <FormLabel>number</FormLabel>
            <Input id='2' placeholder='number' type='number' />
          </FormControl>
          <FormControl id='date1'>
            <FormLabel>date</FormLabel>
            <Input placeholder='date' type='date' />
          </FormControl>
          <FormControl id='email1'>
            <FormLabel>email</FormLabel>
            <Input placeholder='email' type='email' />
          </FormControl>
          <FormControl id='phone1'>
            <FormLabel>phone</FormLabel>
            <Input placeholder='phone' type='tel' />
          </FormControl>
          <FormControl id='single1'>
            <FormLabel>single</FormLabel>
            <Select placeholder='singleSelect'>
              <option value='option1'>option1</option>
              <option value='option2'>option2</option>
              <option value='option3'>option3</option>
            </Select>
          </FormControl>
          <FormControl id='multi1'>
            <FormLabel>multi</FormLabel>
            <CheckboxGroup>
              <HStack>
                <Checkbox value='option1'>option1</Checkbox>
                <Checkbox value='option2'>option2</Checkbox>
                <Checkbox value='option3'>option3</Checkbox>
              </HStack>
            </CheckboxGroup>
          </FormControl>
          {/* </form> */}
        </Flex>
      </Flex>
      <Flex sx={buttomSection}>
        <Flex sx={progressSection}>
          <Text>ความคืบหน้า</Text> {/* why error bro */}
          <Flex sx={progress}>
            <Box sx={a} />
            <Box sx={b} />
          </Flex>
          <Text as='b'>{`${100 * percent} %`}</Text> {/* why error bro */}
        </Flex>
        <Button colorScheme="green" disabled={percent < 1}>ตรวจสอบ</Button>
      </Flex>
    </Box>
  )
}

export default Form