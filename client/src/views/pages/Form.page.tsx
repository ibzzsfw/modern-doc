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
  ModalHeader,
  VStack,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import Fields from 'src/view-models/Field'
import FormInput from 'src/views/components/FormInput.component'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import FileController from 'src/view-models/FileController'
import FolderController from 'src/view-models/FolderController'
import FormPageController from '../view-controllers/FormPage.viewcontroller'

const FormPage = () => {

  const viewController = new FormPageController()
  
  const navigate = viewController.navigate
  const formRef = viewController.formRef
  const { document, field, generatedFiles, selectedDocument, documentType } = viewController.formPageStore
  const { isOpen, onOpen, onClose } = viewController.disclosure
  const [formValues, setFormValues] = viewController.formValuesState
  const [mergedField, setMergedField] = viewController.mergedFieldState
  const [requiredCount, setRequiredCount] = viewController.requiredCountState

  useEffect(() => {
    let count = 0
    field.map((field: Fields) => {
      if (field.isRequired) count++
    })
    setRequiredCount(count)

    if (documentType === 'folder') {
      let temp: Fields[] = []
      for (let i = 0; i < generatedFiles.length; i++) {
        temp = viewController.mergeField(temp, generatedFiles[i].fields)
      }
      setMergedField(temp)
    }
  }, [])

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
              viewController.validationSchemaExraction(mergedField)
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

// let a = {
//   ...abstractBar,
//   width: `calc(${percent} * 100%)`,
//   // bg color purple
//   backgroundColor: '#6B46C1',
// }

// let b = {
//   ...abstractBar,
//   width: `calc(${1 - percent} * 100%)`,
//   // bg color gray
//   backgroundColor: '#E5E7EB',
// }

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

export default FormPage
