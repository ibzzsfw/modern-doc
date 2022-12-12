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
  VStack,
} from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
import { useFormPageStore } from '@stores/FormPageStore'
import { useGeneratedFileStore } from '@stores/GeneratedFile'
import Fields from '@models/Field'
import FormInput from '@components/FormInput'
import { Field, Form, Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { connectStorageEmulator } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import FileController from '@models/FileController'
import FolderController from '@models/FolderController'

const FormPage = () => {
  const { document, field, generatedFiles, selectedDocument, documentType } =
    useFormPageStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const [percent, setPercent] = useState<number>(0.31)
  const [formValues, setFormValues] = useState<any>({})
  const [mergedField, setMergedField] = useState<Fields[]>([])
  const [requiredCount, setRequiredCount] = useState<number>(0)

  const formRef = useRef<any>(null)

  const initialValuesExraction = (field: Fields[]) => {
    const initialValues: { [key: string]: any | any[] } = {}

    field.map((field: Fields) => {
      if (field.userValue) {
        initialValues[field.name] = field.userValue
        return
      }
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
    return initialValues
  }

  const mergeField = (a: Fields[], b: Fields[]): Fields[] => {
    const result: Fields[] = []
    for (let i = 0; i < a.length; i++) {
      result.push(a[i])
    }
    for (let i = 0; i < b.length; i++) {
      let isDuplicate = false
      for (let j = 0; j < a.length; j++) {
        if (a[j].name === b[i].name) {
          isDuplicate = true
          break
        }
      }
      if (!isDuplicate) result.push(b[i])
    }
    return result
  }

  useEffect(() => {
    let count = 0
    field.map((field: Fields) => {
      if (field.isRequired) count++
    })
    setRequiredCount(count)

    if (documentType === 'folder') {
      let temp: Fields[] = []
      for (let i = 0; i < generatedFiles.length; i++) {
        temp = mergeField(temp, generatedFiles[i].fields)
      }
      setMergedField(temp)
    }
  }, [])

  const addRequired = (field: Fields, YupSchema: any) => {
    if (field.isRequired) return YupSchema.required('จำเป็นต้องกรอก')
    return YupSchema
  }

  const validationSchemaExraction = (field: Fields[]) => {
    const validationSchema: { [key: string]: any } = {}

    field.map((field: Fields) => {
      switch (field.type) {
        case 'text':
          validationSchema[field.name] = addRequired(field, Yup.string())
          break
        case 'text':
          validationSchema[field.name] = addRequired(
            field,
            Yup.string()
              .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
              .required('จำเป็นต้องกรอกตัวเลข')
          )

          break
        case 'date':
          validationSchema[field.name] = addRequired(
            field,
            Yup.date().required('จำเป็นต้องกรอกวันที่')
          )
          break
        case 'phoneNumber':
          validationSchema[field.name] = addRequired(
            field,
            Yup.string()
              .required('จำเป็นต้องกรอก')
              .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
              .length(10, 'เบอร์โทรศัพท์จำเป็นต้องมี 10 หลัก')
          )
          break
        case 'email':
          validationSchema[field.name] = addRequired(
            field,
            Yup.string()
              .required('จำเป็นต้องกรอก')
              .matches(
                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                'กรุณากรอกอีเมลให้ถูกต้อง'
              )
          )
          break
        case 'singleSelect':
          validationSchema[field.name] = addRequired(
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
    justifyContent: 'flex-start',
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
            onChange={(e) => {
              console.log('abraham')
            }}
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
            onChange={(e) => {
              console.log('abraham')
            }}
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
            onChange={(e) => {
              console.log('abraham')
            }}
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

  if (documentType == 'file' && field.length == 0) {
    return (
      <Box sx={formLayout}>
        <Heading as="h2" size="lg">
          No such file was selected
        </Heading>
      </Box>
    )
  }

  console.log(requiredCount)

  if (documentType == 'file')
    return (
      <Box sx={formLayout}>
        <Formik
          initialValues={initialValuesExraction(field)}
          validationSchema={Yup.object(validationSchemaExraction(field))}
          onSubmit={(values) => {
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

              <Flex sx={formBox}>
                {field.map((field) => renderField(field))}
              </Flex>
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
          <ModalContent
            maxHeight="600px"
            overflowY="scroll"
            paddingBottom="16px"
          >
            <ModalHeader>ตรวจสอบความถูกต้องของข้อมูล</ModalHeader>
            <ModalCloseButton />
            <Formik
              initialValues={formValues}
              validationSchema={Yup.object(validationSchemaExraction(field))}
              onSubmit={async (values) => {
                onClose()
                FileController.saveGeneratedFile(
                  document?.id,
                  field.map((f, index) => ({
                    ...f,
                    userValue: values[f.name],
                  }))
                )
                navigate(-1)
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

  console.log('doccc', document)

  //folder
  return (
    <Box sx={formLayout}>
      <Formik
        innerRef={formRef}
        initialValues={initialValuesExraction(mergedField)}
        enableReinitialize={true}
        validationSchema={Yup.object(validationSchemaExraction(mergedField))}
        onSubmit={(values) => {
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

            <Flex sx={formBox} ref={formRef}>
              {generatedFiles.map((file, index) => (
                <VStack alignItems="flex-start">
                  <Text fontSize="18px" fontWeight="bold">
                    {index + 1}. {file.officialName}
                  </Text>
                  {file.fields.map((field) => renderField(field))}
                  <hr />
                </VStack>
              ))}
            </Flex>
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
            validationSchema={Yup.object(
              validationSchemaExraction(mergedField)
            )}
            onSubmit={async (values) => {
              onClose()
              FolderController.saveFolder(
                document?.id,
                mergedField.map((f, index) => ({
                  ...f,
                  userValue: values[f.name],
                })),
                generatedFiles
              )
              navigate(-1)
            }}
          >
            <Form>
              <Flex sx={previewBox}>
                {mergedField.map((field) => renderField(field, true))}
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
