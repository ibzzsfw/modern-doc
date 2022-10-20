import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  InputLeftElement
} from '@chakra-ui/react'
import { ErrorMessage, Field } from 'formik'

//proptype
type propsType = {
  label: string
  name: string
  type: string
  placeholder: string
  children?: JSX.Element | JSX.Element[]
  isReadOnly?: boolean
  showCorrectBorder?: boolean
  leftElement?: JSX.Element
  rightElement?: JSX.Element
}

const FormInput = ({
  label,
  name,
  type,
  placeholder,
  children,
  isReadOnly,
  showCorrectBorder,
  leftElement,
  rightElement,
}: propsType) => {
  const renderErrorMessage = (msg: any) => {
    return (
      <Text
        position="absolute"
        fontSize="14px"
        color="red"
        height="8px"
        marginTop="2px"
      >
        {msg}
      </Text>
    )
  }

  return (
    <FormControl paddingBottom="24px">
      <FormLabel>{label}</FormLabel>
      <Field name={name}>
        {({ field, form: { touched, errors }, meta }: any) => (
          <InputGroup>
            {leftElement && <InputLeftElement children={leftElement} />}
            <Input
              name={name}
              type={type}
              placeholder={placeholder}
              isInvalid={meta.touched && meta.error}
              isReadOnly={isReadOnly}
              borderColor={
                showCorrectBorder && !meta.error ? 'green' : 'initial'
              }
              boxShadow={
                showCorrectBorder && !meta.error ? '0 0 0 1px green' : 'initial'
              }
              {...field}
            />
            {rightElement && <InputRightElement children={rightElement} />}
          </InputGroup>
        )}
      </Field>
      <ErrorMessage name={name} render={renderErrorMessage} />
      {children}
    </FormControl>
  )
}

export default FormInput
