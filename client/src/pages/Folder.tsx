import {
  Flex,
  Box,
  Button,
  HStack,
  Heading,
  Tag,
  Spacer,
  Grid,
  Checkbox,
  Divider,
  IconButton,
  ButtonGroup,
  Badge,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import {
  AiOutlineDoubleRight,
  AiOutlineUpload,
  AiOutlineDownload,
  AiFillPrinter,
} from 'react-icons/ai'
import BadgeStatus from '@components/BadgeStatus'
import { useState } from 'react'

const Folder = () => {
  const markdown = `
  ---
  คุณเห็นด้วยไหม?
  สิ่งที่สำคัญกว่าการเขียนโค้ดคือ "การอ่านโค้ด"
  ---
  มี**ตัวหนา**กับ*ตัวเอียง*บรรทัดเดียวกัน
  
  มี**ตัวหนา**กับ _ตัวเอียง_ บรรทัดเดียวกัน
  
  _มี **ตัวหนา** ในบรรทัดที่ทุกตัวอักษรเอียง_
  
  **มี _ตัวเอียง_ ในบรรทัดที่ทุกตัวอักษรหนา**
  ติดตาม BorntoDev ได้ที่ [Facebook] | [YouTube] | [Instagram]
  
  [Facebook]: https://www.facebook.com/borntodev
  [YouTube]: https://www.youtube.com/c/BorntodevTH
  [Instagram]: https://www.instagram.com/borntodev
  รู้หรือไม่?
  
  > ไก่กับไข่อะไรเกิดก่อนกัน
  * มะเขือเทศ
  * สับปะรด
  - [x] Feature A
  - [ ] Feature B
  - [ ] Feature C
  `

  let detailsBox = {
    width: '520px',
    flexDirection: 'column',
    rowGap: '1rem',
  }

  let documentView = {
    justifyContent: 'space-evenly',
    height: '768px',
  }

  let abstractBox = {
    borderRadius: '6px',
    backgroundColor: 'background.white',
    width: 'inherit',
    height: 'fit-content',
  }

  let descriptionBox = {
    ...abstractBox,
    flexDirection: 'column',
    rowGap: '8px',
    padding: '16px 32px',
  }

  let fileList = {
    width: '648px',
    flexDirection: 'column',
    rowGap: '1rem',
  }

  let simpleBox = {
    margin: 'auto',
  }

  let tableBody = {
    ...abstractBox,
    overflow: 'hidden',
    shadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
  }

  let tableContent = {
    width: 'inherit',
    maxHeight: 'calc(768px - 48px - 80px)',
    overflowY: 'scroll',
    overflowX: 'hidden',
  }

  let tableRow = {
    width: 'inherit',
    height: '48px',
    borderBottom: '1px solid',
    borderColor: 'background.gray',
    transition: 'all 0.1s',
    _hover: {
      backgroundColor: 'lightblue',
    },
  }

  let titleText = {
    fontSize: '20px',
    fontWeight: 'semibold',
  }

  let newDocumentBtn = {
    width: '232px',
    backgroundColor: 'accent.green',
    color: 'accent.white',
    _hover: {
      backgroundColor: 'accent.green',
      color: 'accent.white',
    },
    _active: {
      backgroundColor: 'accent.green',
      color: 'accent.white',
    },
  }

  let editDocumentBtn = {
    width: '232px',
    backgroundColor: 'accent.white',
    color: 'accent.black',
    border: '1px solid',
    borderColor: 'accent.blue',
    _hover: {
      backgroundColor: 'accent.white',
      color: 'accent.black',
    },
    _active: {
      backgroundColor: 'accent.white',
      color: 'accent.black',
    },
  }

  return (
    <Flex sx={documentView}>
      <Flex sx={detailsBox}>
        <Flex sx={descriptionBox}>
          <HStack align="center">
            <Heading sx={titleText}>ชื่อแฟ้ม</Heading>
            <BadgeStatus status="แฟ้มใหม่" />
            <Spacer />
            <BadgeStatus status="ยังไม่เคยสร้างแฟ้มนี้" />
          </HStack>
          <ReactMarkdown children={markdown} />
          <Box textAlign="end">
            <Button
              size="sm"
              borderColor="accent.blue"
              variant="outline"
              rightIcon={<AiOutlineDoubleRight />}
              onClick={() => setExpand((expand) => !expand)}
            >
              อ่านเพิ่มเติม
            </Button>
          </Box>
        </Flex>
        <Box sx={descriptionBox}>
          หลับตาลงก็คิดถึงคุณที่อยู่ตรงนี้ตลอดมา
          ช่วงเวลาที่เราจับมือและมอบความรักก่อนจากลา ยิ้มที่ผมเคยมองทุกวัน
          คำที่คุณต้องพูดทุกครา ฉันคิดถึงเธอจริง ๆ
        </Box>
        <Spacer />
        <ButtonGroup gap="24px">
          <Button sx={newDocumentBtn}>สร้างเอกสารใหม่</Button>
          <Button sx={editDocumentBtn}>แก้ไขเอกสารเดิม</Button>
        </ButtonGroup>
      </Flex>
      <Flex sx={fileList}>
        <Box sx={tableBody}>
          <Grid templateColumns="1fr 3fr 1fr 2fr 3fr 1fr" sx={tableRow}>
            <Box sx={simpleBox}>
              <Checkbox />
            </Box>
            <Box sx={simpleBox}>ชื่อเอกสาร</Box>
            <Box sx={simpleBox}>จำนวน</Box>
            <Box sx={simpleBox}>สถานะ</Box>
            <Box sx={simpleBox}>หมายเหตุ</Box>
          </Grid>
          <Divider />
          <Box sx={tableContent}>
            {[...Array(10).keys()].map((index) => {
              return (
                <>
                  <Grid
                    templateColumns="1fr 3fr 1fr 2fr 3fr 1fr"
                    sx={tableRow}
                    key={index}
                  >
                    <Box sx={simpleBox}>
                      <Checkbox />
                    </Box>
                    <Box sx={simpleBox}>ชื่อเอกสาร</Box>
                    <Box sx={simpleBox}>จำนวน</Box>
                    <Box sx={simpleBox}>สถานะ</Box>
                    <Box sx={simpleBox}>
                      <BadgeStatus status="มีอยู่ในคลัง" />
                    </Box>
                    <Box sx={simpleBox}>...</Box>
                  </Grid>
                  <Grid templateColumns="1fr 3fr 1fr 2fr 3fr 1fr" sx={tableRow}>
                    <Box sx={simpleBox}>
                      <IconButton
                        aria-label="Search database"
                        icon={<AiOutlineUpload />}
                        size="sm"
                      />
                    </Box>
                    <Box sx={simpleBox}>ชื่อเอกสาร</Box>
                    <Box sx={simpleBox}>จำนวน</Box>
                    <Box sx={simpleBox}>สถานะ</Box>
                    <Box sx={simpleBox}>
                      <BadgeStatus status="หมดอายุ" />
                    </Box>
                    <Box sx={simpleBox}>...</Box>
                  </Grid>
                </>
              )
            })}
          </Box>
        </Box>
        <ButtonGroup color="accent.white">
          <Spacer />
          <Button
            backgroundColor="accent.blue"
            size="sm"
            rightIcon={<AiOutlineDownload />}
          >
            ดาวน์โหลดแฟ้ม
          </Button>
          <Button
            backgroundColor="accent.black"
            size="sm"
            rightIcon={<AiFillPrinter />}
          >
            พิมพ์แฟ้ม
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
}

export default Folder
