import {
  Flex
} from '@chakra-ui/react'
import FileList from '@components/FileList'
import FolderDetail from '@components/FolderDetail'
import FolderUploadedFile from '@models/FolderUploadedFile'
import { addDays, subDays } from 'date-fns'

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
