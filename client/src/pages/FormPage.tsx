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
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useFormPageStore } from '@stores/FormPageStore'
import { useGeneratedFileStore } from '@stores/GeneratedFile'
import Fields from '@models/Field'
import FormInput from '@components/FormInput'
import { Field, Form, Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { connectStorageEmulator } from 'firebase/storage'

const FormPage = () => {
  const { document, field } = useFormPageStore()

  const [percent, setPercent] = useState<number>(0.31)

  const initialValuesExraction = () => {
    const initialValues: { [key: string]: any | any[] } = {}

    field.map((field: Fields) => {
      switch (field.type) {
        case 'number':
          initialValues[field.name] = 0
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

  const validationSchemaExraction = () => {
    const validationSchema: { [key: string]: any } = {}

    field.map((field: Fields) => {
      switch (field.type) {
        case 'text':
          validationSchema[field.name] = Yup.string().required('จำเป็นต้องกรอก')
          break
        case 'number':
          validationSchema[field.name] = Yup.number().required(
            'จำเป็นต้องกรอกตัวเลข'
          )
          break
        case 'date':
          validationSchema[field.name] = Yup.date().required(
            'จำเป็นต้องกรอกวันที่'
          )
          break
        case 'phoneNumber':
          validationSchema[field.name] = Yup.string()
            .required('จำเป็นต้องกรอก')
            .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
            .length(10, 'เบอร์โทรศัพท์จำเป็นต้องมี 10 หลัก')
          break
        case 'email':
          validationSchema[field.name] = Yup.string()
            .required('จำเป็นต้องกรอก')
            .matches(
              /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              'กรุณากรอกอีเมลให้ถูกต้อง'
            )
          break
        case 'singleSelect':
          validationSchema[field.name] = Yup.string()
            .oneOf(field.fieldChoice.map((choice) => choice.name))
            .required('เลือก 1 ตัวเลือก')
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
    justifyContent: 'space-between',
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

  let topSection = {
    flexDirection: 'column',
    rowGap: '2rem',
    backgroundColor: 'white',
    padding: '3rem',
    borderRadius: '8px',
  }

  const renderField = (field: Fields) => {
    switch (field.type) {
      case 'text':
        return (
          <FormInput
            label={field.officialName}
            name={field.name}
            placeholder="string"
            type="text"
            showCorrectBorder
          />
        )
      case 'number':
        return (
          <FormInput
            label={field.officialName}
            name={field.name}
            placeholder="number"
            type="number"
            showCorrectBorder
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
          console.log('values')
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
            <Flex sx={progressSection}>
              <Text>ความคืบหน้า</Text>
              <Flex sx={progress}>
                <Box sx={a} />
                <Box sx={b} />
              </Flex>
              <Text as="b">{`${100 * percent} %`}</Text> {/* why error bro */}
            </Flex>
            <Button type="submit" colorScheme="green">
              ตรวจสอบ
            </Button>
          </Flex>
        </Form>
      </Formik>
    </Box>
  )
}

export default FormPage
