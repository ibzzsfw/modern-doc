import PopularBar from '@components/PopularBar'
import PopularBox from '@components/PopularBox'
import DocumentBar from '@components/DocumentBar'
import DocumentBox from '@components/DocumentBox'
import SearchBox from '@components/SearchBox'
import {
  VStack,
  Center,
  Box,
  Checkbox,
  CheckboxGroup,
  HStack,
  Flex,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

const SearchPage = () => {
  const state = [1, 2, 3, 4]

  let layout = {
    padding: '24px 0',
    gap: '32px',
    flexDirection: 'column',
    maxWidth: '1280px',
  }

  let childrenFlex = {
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    margin: 'auto',
    gap: '32px',
  }

  return (
    <VStack marginTop="4px">
      <VStack align="start">
        <Center>
          <SearchBox setValue={'คนพิการ'} />
        </Center>

        <VStack align="start">
          <HStack>
            <Checkbox defaultChecked value="1">
              รายการ
            </Checkbox>
            <Checkbox defaultChecked value="2">
              เอกสาร
            </Checkbox>
          </HStack>
          <HStack>
            <Checkbox defaultChecked value="3">
              upload
            </Checkbox>
            <Checkbox defaultChecked value="4">
              generate
            </Checkbox>
          </HStack>
        </VStack>
      </VStack>
      <Center>
        <VStack align="start">
          <Flex sx={layout}>
            <Text
              fontSize="18px"
              fontWeight="bold"
              margin={['auto', null, null, 0]}
            >
              ผลการค้นหารายการ
            </Text>
            <Flex sx={childrenFlex}>
              <DocumentBox
                title="จ้างงานคนพิการ"
                type="generatedFolder"
                showDate
                colorBar="#FF9898"
              />
              <DocumentBox
                title="จ้างงานคนพิการ"
                type="generatedFolder"
                showDate
                createdDate={new Date('12/08/2021')}
              />
              <DocumentBox
                title="ขึ้นทะเบียนคนพิการ"
                type="generatedFolder"
                showDate
                createdDate={new Date('12/08/2021')}
              />
            </Flex>
          </Flex>

          <Flex sx={layout}>
            <Text
              fontSize="18px"
              fontWeight="bold"
              margin={['auto', null, null, 0]}
            >
              ผลการค้นหาเอกสาร
            </Text>
            <Flex sx={childrenFlex}>
              <DocumentBox
                title="หนังสือมอบอำนาจ"
                type="generatedFile"
                showDate
                colorBar="#FF9898"
              />
              <DocumentBox
                title="เอกสารผู้ดูแลคนพิการ"
                type="generatedFile"
                showDate
                createdDate={new Date('12/08/2021')}
              />
              <DocumentBox
                title="บัตรคนพิการ"
                type="uploadedFile"
                showDate
                createdDate={new Date('12/08/2021')}
                colorBar="#FF9898"
              />
              <DocumentBox
                title="จ้างงานคนพิการ"
                type="generatedFile"
                showDate
                createdDate={new Date('12/08/2021')}
                colorBar="#FF9898"
              />
              <DocumentBox
                title="ขึ้นทะเบียนคนพิการ"
                type="generatedFile"
                showDate
                createdDate={new Date('12/08/2021')}
                colorBar="#FF9898"
              />
            </Flex>
          </Flex>
        </VStack>
      </Center>
    </VStack>
  )
}

export default SearchPage
