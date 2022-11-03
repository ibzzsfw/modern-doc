import {
  Flex
} from '@chakra-ui/react'
import FileList from '@components/FileList'
import FolderDetail from '@components/FolderDetail'
import FolderUploadedFile from '@models/FolderUploadedFile'
import { addDays, subDays } from 'date-fns'

const Folder = () => {
  const markdown = `
  # BorntoDev Heading 1 
## BorntoDev Heading 2 
คุณเห็นด้วยไหม?
สิ่งที่สำคัญกว่าการเขียนโค้ดคือ "การอ่านโค้ด"
อยากได้เส้นคั่นอะ
ก็บอกว่าอยากได้เส้นคั่นไง!
---
มี**ตัวหนา**กับ*ตัวเอียง*บรรทัดเดียวกัน
มี**ตัวหนา**กับ _ตัวเอียง_ บรรทัดเดียวกัน
_มี **ตัวหนา** ในบรรทัดที่ทุกตัวอักษรเอียง_
**มี _ตัวเอียง_ ในบรรทัดที่ทุกตัวอักษรหนา**
เป็นทั้ง ***ตัวหนาและตัวเอียง*** ในคำเดียวกัน 1
เป็นทั้ง ___ตัวหนาและตัวเอียง___ ในคำเดียวกัน 2
เป็นทั้ง **_ตัวหนาและตัวเอียง_** ในคำเดียวกัน 3
อยากขีด~~ข้อความ~~นี้
ติดตาม BorntoDev ได้ที่ [Facebook] | [YouTube] | [Instagram]
[Facebook]: https://www.facebook.com/borntodev
[YouTube]: https://www.youtube.com/c/BorntodevTH
[Instagram]: https://www.instagram.com/borntodev
![Logo](https://www.borntodev.com/wp-content/uploads/2018/09/Black_Yellow_white-1.png)
รู้หรือไม่?
* มะเขือเทศ
* สับปะรด
- [x] Feature A
- [ ] Feature B
- [ ] Feature C
#### ช่องทางติดตาม BorntoDev

| ลำดับที่ | ช่องทางติดตาม | ลิงก์ของแต่ละช่องทาง |
| :---- | :----: | ----: |
| 1 | Facebook | https://www.facebook.com/borntodev |
| 10 | YouTube | https://www.youtube.com/c/BorntodevTH |
| 100 | Instagram | https://www.instagram.com/borntodev |
  `


  let documentView = {
    justifyContent: 'space-evenly',
    height: '768px',
  }

  return (
    <Flex sx={documentView}>
      <FolderDetail
        title="เอกสารขจัดขนตูด"
        description="เอกสารขจัดขนตูดนี้มีมาก ไม่สิ ต้องพูดว่ามีต่อดากมากกก"
        markdown={markdown}
        status="มีอยู่ในคลัง"
      />

      <FileList
        files={[
          new FolderUploadedFile(
            '12',
            'เอกสารขจัดขนตูด',
            new Date(),
            new Date()
          ),
          new FolderUploadedFile(
            '13',
            'เอกสารขจัดขนตูด2',
            subDays(new Date(), 3),
            addDays(new Date(), 3),
            '',
            '',
            3,
            ''
          ),
          new FolderUploadedFile(
            '14',
            'เอกสารขจัดขนตูด3',
            subDays(new Date(), 100),
            addDays(new Date(), 100),
            '',
            '',
            2,
            ''
          ),
          new FolderUploadedFile(
            '13',
            'เอกสารขจัดขนตูด4',
            subDays(new Date(), 3),
            addDays(new Date(), 3),
            '',
            '',
            1,
            null
          ),
        ]}
      />
    </Flex>
  )
}

export default Folder
