import
  {
    FormControl,
    FormLabel, Input, InputGroup, Text
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
}

const FormInput = ({
  label,
  name,
  type,
  placeholder,
  children,
  isReadOnly,
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
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Field name={name}>
        {({ field, form: { touched, errors }, meta }: any) => (
          <InputGroup>
            <Input
              name={name}
              type={type}
              placeholder={placeholder}
              isInvalid={meta.touched && meta.error}
              isReadOnly={isReadOnly}
              {...field}
            />
          </InputGroup>
        )}
      </Field>
      <ErrorMessage name={name} render={renderErrorMessage} />
      {children}
    </FormControl>
  )
}

export default FormInput
