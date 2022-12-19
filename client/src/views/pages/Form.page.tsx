import {
  Box,
  Text,
  Flex,
  Button,
  Heading,
  FormControl,
  FormLabel,
  CheckboxGroup,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  ModalHeader,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import FieldViewModel from '@view-models/Field.viewmodel'
import FormInput from '@components/FormInput.component'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import FileController from '@view-models/FileController'
import FolderController from '@view-models/FolderController'
import FormPageController from '@view-controllers/Form.page.viewcontroller'

const FormPage = () => {

  const viewController = new FormPageController()

  const { document, field, generatedFile, selectedFile, documentType } = viewController.formPageModel
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const [formValues, setFormValues] = viewController.formValuesState
  const [mergedField, setMergedField] = viewController.mergedFieldState
  const [requiredCount, setRequiredCount] = viewController.requiredCountState

  const formRef = useRef<any>(null)

  useEffect(() => {
    let count = 0
    field.map((field: FieldViewModel) => {
      if (field.isRequired) count++
    })
    setRequiredCount(count)

    if (documentType === 'folder') {
      let temp: FieldViewModel[] = []
      for (let i = 0; i < generatedFile.length; i++) {
        temp = viewController.mergeField(temp, generatedFile[i].fields ?? [])
      }
      setMergedField(temp)
    }
  }, [])


  const renderField = (field: FieldViewModel, disable: boolean = false) => {
    switch (field.type) {
      case 'text':
        return (
          <FormInput
            label={field.officialName ?? field.name}
            name={field.name}
            placeholder="string"
            type="text"
            showCorrectBorder
            required={field.isRequired}
            disable={disable}
            onChange={(e) => {
            }}
          />
        )
      case 'number':
        return (
          <FormInput
            label={field.officialName ?? field.name}
            name={field.name}
            placeholder="number"
            type="text"
            showCorrectBorder
            required={field.isRequired}
            disable={disable}
            onChange={(e) => {
            }}
          />
        )
      case 'date':
        return (
          <FormInput
            label={field.officialName ?? field.name}
            name={field.name}
            placeholder="date"
            type="date"
            showCorrectBorder
            required={field.isRequired}
            disable={disable}
            onChange={(e) => {
            }}
          />
        )
      case 'email':
        return (
          <FormInput
            label={field.officialName ?? field.name}
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
            label={field.officialName ?? field.name}
            name={field.name}
            placeholder="0800000000"
            type="text"
            showCorrectBorder
            required={field.isRequired}
            disable={disable}
          />
        )
      case 'singleSelect': {
        console.log(field.choices)
        return (
          <FormInput
            label={field.officialName ?? field.name}
            name={field.name}
            type="select"
            showCorrectBorder
            placeholder="Select option"
            options={field.choices.map((choice: any) => choice.officialName)}
            optionsValue={field.choices.map((choice: any) => choice.name)}
            required={field.isRequired}
            disable={disable}
          />
        )
      }
      case 'multipleSelect':
        return (
          <FormControl id={field.id}>
            <FormLabel>{field.officialName}</FormLabel>
            <CheckboxGroup>
              {field.choices.map((choice: any) => (
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

  if (documentType == 'file')
    return (
      <Box sx={formLayout}>
        <Formik
          initialValues={viewController.initialValuesExraction(field)}
          validationSchema={Yup.object(viewController.validationSchemaExraction(field))}
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
              <Button type="submit" colorScheme="green" marginTop='1rem'>
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
              validationSchema={Yup.object(viewController.validationSchemaExraction(field))}
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

  //folder
  return (
    <Box sx={formLayout}>
      <Formik
        innerRef={formRef}
        initialValues={viewController.initialValuesExraction(mergedField)}
        enableReinitialize={true}
        validationSchema={Yup.object(viewController.validationSchemaExraction(mergedField))}
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
              {generatedFile.map((file, index) => (
                <VStack alignItems="flex-start">
                  <Text fontSize="18px" fontWeight="bold">
                    {index + 1}. {file.officialName}
                  </Text>
                  {
                    file.fields &&
                    file.fields.map((field) => renderField(field))
                  }
                  <hr />
                </VStack>
              ))}
            </Flex>
          </Flex>
          <Flex sx={buttomSection}>
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
              viewController.validationSchemaExraction(mergedField)
            )}
            onSubmit={async (values) => {
              let ids: { id: string }[] = []
              generatedFile.map((file) => {
                if (file.id) {
                  ids.push({ id: file.id })
                }
              })
              onClose()
              FolderController.saveFolder(
                document?.id,
                mergedField.map((f) => ({
                  ...f,
                  userValue: values[f.name],
                })),
                ids
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

let formLayout = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '1rem',
  width: '70%',
  maxHeight: '768px',
  margin: 'auto',
}

let buttomSection = {
  alignItems: 'center',
  justifyContent: 'flex-end',
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