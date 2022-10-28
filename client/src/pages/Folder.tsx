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
  ButtonGroup
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import { AiOutlineDoubleRight, AiOutlineUpload, AiOutlineDownload, AiFillPrinter } from 'react-icons/ai'

const File = () => {


  let detailsBox = {
    width: '520px',
    flexDirection: 'column',
    rowGap: '1rem',
  }

  let documentView = {
    justifyContent: 'space-evenly',
    height: '768px'
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
  }


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

  return (
    <Flex sx={documentView}>
      <Flex sx={detailsBox}>
        <Flex sx={descriptionBox}>
          <HStack align='center'>
            <Heading>ชื่อแฟ้ม</Heading>
            <Tag backgroundColor='accent.green' size='sm'>แฟ้มใหม่</Tag>
            <Spacer />
            <Tag backgroundColor='orange' size='sm'>แก้ไขล่าสุดเมื่อ 20/10/2565 09.00 น.</Tag>
          </HStack>
          <ReactMarkdown children={markdown} />
          <Box textAlign='end'>
            <Button size='sm' borderColor='accent.blue' variant='outline' rightIcon={<AiOutlineDoubleRight />}>
              อ่านเพิ่มเติม
            </Button>
          </Box>
        </Flex>
        <Box sx={descriptionBox}>
          <Heading marginBottom='1rem' color='red'>บันทึก (ทำ editable ด้วย)</Heading>
          หลับตาลงก็คิดถึงคุณที่อยู่ตรงนี้ตลอดมา
          ช่วงเวลาที่เราจับมือและมอบความรักก่อนจากลา
          ยิ้มที่ผมเคยมองทุกวัน คำที่คุณต้องพูดทุกครา
          ฉันคิดถึงเธอจริง ๆ
        </Box>
        <Spacer />
        <ButtonGroup>
          <Button backgroundColor='accent.green' variant='solid'>
            สร้างเอกสารใหม่
          </Button>
          <Button borderColor='accent.blue' variant='outline'>
            แก้ไขเอกสารเดิม
          </Button>
        </ButtonGroup>
      </Flex>
      <Flex sx={fileList}>
        <Box sx={tableBody}>
          <Grid templateColumns='1fr 3fr 1fr 2fr 3fr 1fr' sx={tableRow}>
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
            {
              [...Array(10).keys()].map((index) => {
                return (<>
                  <Grid templateColumns='1fr 3fr 1fr 2fr 3fr 1fr' sx={tableRow}>
                    <Box sx={simpleBox}>
                      <Checkbox />
                    </Box>
                    <Box sx={simpleBox}>ชื่อเอกสาร</Box>
                    <Box sx={simpleBox}>จำนวน</Box>
                    <Box sx={simpleBox}>สถานะ</Box>
                    <Box sx={simpleBox}>
                      <Tag backgroundColor='accent.green' size='sm' color='accent.white'>มีอยู่ในคลัง</Tag>
                    </Box>
                    <Box sx={simpleBox}>...</Box>
                  </Grid>
                  <Grid templateColumns='1fr 3fr 1fr 2fr 3fr 1fr' sx={tableRow}>
                    <Box sx={simpleBox}>
                      <IconButton aria-label='Search database' icon={<AiOutlineUpload />} />
                    </Box>
                    <Box sx={simpleBox}>ชื่อเอกสาร</Box>
                    <Box sx={simpleBox}>จำนวน</Box>
                    <Box sx={simpleBox}>สถานะ</Box>
                    <Box sx={simpleBox}>
                      <Tag backgroundColor='accent.red' size='sm' color='accent.white'>หมดอายุ</Tag>
                    </Box>
                    <Box sx={simpleBox}>...</Box>
                  </Grid>
                </>)
              })
            }
          </Box>
        </Box>
        <ButtonGroup color='accent.white'>
          <Spacer />
          <Button backgroundColor='accent.blue' size='sm' rightIcon={<AiOutlineDownload />}>
            ดาวน์โหลดแฟ้ม
          </Button>
          <Button backgroundColor='accent.black' size='sm' rightIcon={<AiFillPrinter />}>
            พิมพ์แฟ้ม
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  )
}

export default File