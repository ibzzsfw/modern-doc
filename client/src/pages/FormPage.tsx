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
  FormErrorMessage,
  Select,
  CheckboxGroup,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  ModalHeader,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useFormPageStore } from '@stores/FormPageStore'
import { useGeneratedFileStore } from '@stores/GeneratedFile'
import Fields from '@models/Field'
import FormInput from '@components/FormInput'
import { Field, Form, Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { connectStorageEmulator } from 'firebase/storage'
import download from 'downloadjs'
import { PDFDocument } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { useNavigate } from 'react-router-dom'

const FormPage = () => {
  const { document, field } = useFormPageStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const [percent, setPercent] = useState<number>(0.31)
  const [formValues, setFormValues] = useState<any>({})

  const initialValuesExraction = () => {
    const initialValues: { [key: string]: any | any[] } = {}

    field.map((field: Fields) => {
      switch (field.type) {
        case 'number':
          initialValues[field.name] = '0'
          break
        case 'date':
          initialValues[field.name] = new Date()
          break
        case 'multiSelect':
          initialValues[field.name] = []
          break
        default:
          initialValues[field.name] = ''
          break
      }
    })
    console.log('initialValues', initialValues)
    return initialValues
  }

  const addRequired = (field: Fields, YupSchema: any) => {
    if (field.isRequired) return YupSchema.required('จำเป็นต้องกรอก')
    return YupSchema
  }

  const validationSchemaExraction = () => {
    const validationSchema: { [key: string]: any } = {}

    field.map((field: Fields) => {
      switch (field.type) {
        case 'text':
          addRequired(field, (validationSchema[field.name] = Yup.string()))
          break
        case 'text':
          addRequired(
            field,
            (validationSchema[field.name] = Yup.string()
              .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
              .required('จำเป็นต้องกรอกตัวเลข'))
          )
          break
        case 'date':
          addRequired(
            field,
            (validationSchema[field.name] = Yup.date().required(
              'จำเป็นต้องกรอกวันที่'
            ))
          )
          break
        case 'phoneNumber':
          addRequired(
            field,
            (validationSchema[field.name] = Yup.string()
              .required('จำเป็นต้องกรอก')
              .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
              .length(10, 'เบอร์โทรศัพท์จำเป็นต้องมี 10 หลัก'))
          )
          break
        case 'email':
          addRequired(
            field,
            (validationSchema[field.name] = Yup.string()
              .required('จำเป็นต้องกรอก')
              .matches(
                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                'กรุณากรอกอีเมลให้ถูกต้อง'
              ))
          )
          break
        case 'singleSelect':
          addRequired(
            field,
            (validationSchema[field.name] = Yup.string()
              .oneOf(field.fieldChoice.map((choice) => choice.name))
              .required('เลือก 1 ตัวเลือก'))
          )
          break
        case 'multiSelect':
          validationSchema[field.name] = Yup.array().required(
            'เลือกอย่างน้อย 1 ตัวเลือก'
          )
          break
        default:
          break
      }
    })

    return validationSchema
  }

  // const formik = useFormik({
  //   initialValues: initialValuesExraction(),
  //   validationSchema: Yup.object(validationSchemaExraction()),
  //   onSubmit: values => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  console.log(field)

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
    justifyContent: 'flex-end',
  }

  let progressSection = {
    columnGap: '1rem',
    height: 'fit-content',
  }

  let formBox = {
    flexDirection: 'column',
    padding: '0 40% 0 2rem',
    rowGap: '1rem',
    maxHeight: '530px',
    overflow: 'auto',
  }

  let previewBox = {
    flexDirection: 'column',
    padding: '0 36px',
    rowGap: '0',
    overflow: 'auto',
  }

  let topSection = {
    flexDirection: 'column',
    rowGap: '2rem',
    backgroundColor: 'white',
    padding: '3rem',
    borderRadius: '8px',
  }

  let submitButton = {
    width: '102px',
    height: '40px',
    backgroundColor: 'accent.blue',
    color: 'white',
    margin: 'auto',
    _hover: {
      backgroundColor: 'hover.blue',
    },
    _active: {
      backgroundColor: 'hover.blue',
    },
  }

  const renderField = (field: Fields, disable: boolean = false) => {
    switch (field.type) {
      case 'text':
        return (
          <FormInput
            label={field.officialName}
            name={field.name}
            placeholder="string"
            type="text"
            showCorrectBorder
            required={field.isRequired}
            disable={disable}
          />
        )
      case 'number':
        return (
          <FormInput
            label={field.officialName}
            name={field.name}
            placeholder="number"
            type="text"
            showCorrectBorder
            required={field.isRequired}
            disable={disable}
          />
        )
      case 'date':
        return (
          <FormInput
            label={field.officialName}
            name={field.name}
            placeholder="date"
            type="date"
            showCorrectBorder
            required={field.isRequired}
            disable={disable}
          />
        )
      case 'email':
        return (
          <FormInput
            label={field.officialName}
            name={field.name}
            placeholder="email"
            type="text"
            showCorrectBorder
            required={field.isRequired}
            disable={disable}
          />
        )
      case 'phoneNumber':
        return (
          <FormInput
            label={field.officialName}
            name={field.name}
            placeholder="0800000000"
            type="text"
            showCorrectBorder
            required={field.isRequired}
            disable={disable}
          />
        )
      case 'singleSelect': {
        console.log(field.fieldChoice)
        return (
          <FormInput
            label={field.officialName}
            name={field.name}
            type="select"
            showCorrectBorder
            placeholder="Select option"
            options={field.fieldChoice.map((choice) => choice.officialName)}
            optionsValue={field.fieldChoice.map((choice) => choice.name)}
            required={field.isRequired}
            disable={disable}
          />
        )
      }
      case 'multiSelect':
        return (
          <FormControl id={field.id}>
            <FormLabel>{field.officialName}</FormLabel>
            <CheckboxGroup>
              {field.fieldChoice.map((choice) => (
                <Checkbox value={choice.name}>{choice.officialName}</Checkbox>
              ))}
            </CheckboxGroup>
          </FormControl>
        )
      default:
        return null
    }
  }

  const fillForm = async (values: any) => {
    const formUrl = document?.URI ? document.URI : ''
    // Fetch the PDF with form fields
    const formBytes = await fetch(formUrl).then((res) => res.arrayBuffer())

    // Fetch the Sarabun font
    const fontUrl = '/assets/THSarabunNew.ttf'
    const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer())

    // Load the PDF with form fields
    const pdfDoc = await PDFDocument.load(formBytes)

    // Embed the font
    pdfDoc.registerFontkit(fontkit)
    const sarabunFont = await pdfDoc.embedFont(fontBytes)

    const form = pdfDoc.getForm()

    field.map((field: Fields) => {
      if (form.getFieldMaybe(field.name)) {
        console.log(field.name, values[field.name])
        switch (field.type) {
          case 'text':
            form.getTextField(field.name).setText(values[field.name])
            break
          case 'number':
            form.getTextField(field.name).setText(values[field.name])
            break
          case 'date':
            form.getTextField(field.name).setText(values[field.name])
            break
          case 'singleSelect':
            form.getRadioGroup(field.name).select(values[field.name])
            break
          case 'multiSelect':
            form.getCheckBox('option1').check()
            break
          default:
            form
              .getTextField(field.name)
              .setText('ภาษาไทย ' + field.officialName)
            break
        }
      }
    })

    form.updateFieldAppearances(sarabunFont)

    form.flatten()

    const pdfBytes = await pdfDoc.save()
    await download(pdfBytes, 'filled.pdf', 'application/pdf')
  }

  if (field.length == 0) {
    return (
      <Box sx={formLayout}>
        <Heading as="h2" size="lg">
          No such file was selected
        </Heading>
      </Box>
    )
  }

  return (
    <Box sx={formLayout}>
      <Formik
        initialValues={initialValuesExraction()}
        validationSchema={Yup.object(validationSchemaExraction())}
        onSubmit={(values) => {
          // fillForm(values)
          onOpen()
          setFormValues(values)
          console.table(values)
        }}
      >
        <Form>
          <Flex sx={topSection}>
            <Box>
              <Heading as="h2" size="lg">
                ข้อมูลที่จำเป็น
              </Heading>
              <Text as="p">
                ข้อมูลเหล่านี้จะถูกนำไปบันทึกในเอกสารที่ระบบจะสร้างขึ้น
              </Text>
              <Text as="p" color="gray">
                ท่านสามารถตรวจสอบข้อมูลอีกครั้งเมื่อกรอกข้อมูลที่จำเป็นครบถ้วน
              </Text>
            </Box>

            <Flex sx={formBox}>{field.map((field) => renderField(field))}</Flex>
          </Flex>
          <Flex sx={buttomSection}>
            {/* <Flex sx={progressSection}>
              <Text>ความคืบหน้า</Text>
              <Flex sx={progress}>
                <Box sx={a} />
                <Box sx={b} />
              </Flex>
              <Text as="b">{`${100 * percent} %`}</Text> 
            </Flex> */}
            <Button type="submit" colorScheme="green">
              ตรวจสอบ
            </Button>
          </Flex>
        </Form>
      </Formik>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxHeight="600px" overflowY="scroll" paddingBottom="16px">
          <ModalHeader>ตรวจสอบความถูกต้องของข้อมูล</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={formValues}
            validationSchema={Yup.object(validationSchemaExraction())}
            onSubmit={async (values) => {
              fillForm(values).then(() => {
                onClose()
                navigate(-1)
              })
            }}
          >
            <Form>
              <Flex sx={previewBox}>
                {field.map((field) => renderField(field, true))}
                <Button type="submit" sx={submitButton}>
                  บันทึก
                </Button>
              </Flex>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default FormPage
