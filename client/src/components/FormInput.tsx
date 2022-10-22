import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  InputLeftElement,
  Select,
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
  options?: string[]
  format?: string
  width?: string
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
  options,
  format,
  width,
}: propsType) => {
  const renderErrorMessage = (msg: any) => {
    return (
      <Text
        position="absolute"
        fontSize="14px"
        color="red"
        height="8px"
        marginTop="4px"
      >
        {msg}
      </Text>
    )
  }

  if (type === 'select') {
    return (
      <FormControl paddingBottom="24px">
        <FormLabel>{label}</FormLabel>
        <Field name={name}>
          {({ field, form: { touched, errors }, meta }: any) => (
            <Select
              placeholder={placeholder}
              name={name}
              isInvalid={meta.touched && meta.error}
              isReadOnly={isReadOnly}
              width={width}
              borderColor={
                showCorrectBorder && !meta.error && meta.touched ? 'green' : 'accent.gray'
              }
              boxShadow={
                showCorrectBorder && !meta.error && meta.touched
                  ? '0 0 0 1px green'
                  : 'accent.gray'
              }
              _hover={{
                borderColor: 'accent.gray',
              }}
              {...field}
            >
              {options?.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </Select>
          )}
        </Field>
        <ErrorMessage name={name} render={renderErrorMessage} />
        {children}
      </FormControl>
    )
  } else {
    return (
      <FormControl paddingBottom="24px">
        <FormLabel>{label}</FormLabel>
        <Field name={name} width={width}>
          {({ field, form: { touched, errors }, meta }: any) => (
            <InputGroup >
              {leftElement && <InputLeftElement children={leftElement} />}
              <Input
                name={name}
                type={type}
                placeholder={placeholder}
                isInvalid={meta.touched && meta.error}
                isReadOnly={isReadOnly}
                width={width}
                borderColor={
                  showCorrectBorder && !meta.error && meta.touched ? 'green' : 'accent.gray'
                }
                boxShadow={
                  showCorrectBorder && !meta.error && meta.touched
                    ? '0 0 0 1px green'
                    : 'accent.gray'
                }
                _hover={{
                  borderColor: 'accent.gray',
                }}
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
}

export default FormInput
