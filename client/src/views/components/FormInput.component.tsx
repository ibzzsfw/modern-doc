import {
  chakra,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text
} from '@chakra-ui/react'
import { ErrorMessage, Field } from 'formik'

//proptype
type propsType = {
  label: string
  name: string
  type: string
  placeholder: string
  children?: JSX.Element | JSX.Element[]
  disable?: boolean
  showCorrectBorder?: boolean
  leftElement?: JSX.Element
  rightElement?: JSX.Element
  options?: string[]
  format?: string
  width?: string
  optionsValue?: string[]
  required?: boolean
  onChange?: (e: any) => void
}

const FormInput = ({
  label,
  name,
  type,
  placeholder,
  children,
  disable,
  showCorrectBorder,
  leftElement,
  rightElement,
  options,
  format,
  width,
  optionsValue,
  required,
  onChange,
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
        <FormLabel>
          {label}
          {required && <chakra.span color="red">*</chakra.span>}
        </FormLabel>
        <Field name={name}>
          {({ field, form: { touched, errors }, meta }: any) => (
            <Select
              placeholder={placeholder}
              name={name}
              isInvalid={meta.touched && meta.error}
              disabled={disable}
              width={width}
              onChange={(e) => {
                if (onChange) onChange(e)
              }}
              borderColor={
                showCorrectBorder && !meta.error && meta.touched
                  ? 'green'
                  : 'accent.gray'
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
              {options?.map((option, index) => (
                <option value={optionsValue ? optionsValue[index] : option}>
                  {option}
                </option>
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
        <FormLabel>
          {label}
          {required && <chakra.span color="red">*</chakra.span>}
        </FormLabel>
        <Field name={name} width={width}>
          {({ field, form: { touched, errors }, meta }: any) => (
            <InputGroup>
              {leftElement && <InputLeftElement children={leftElement} />}
              <Input
                name={name}
                type={type}
                placeholder={placeholder}
                isInvalid={meta.touched && meta.error}
                disabled={disable}
                value={field.value}
                width={width}
                onChange={(e) => {
                  if (onChange) onChange(e)
                }}
                borderColor={
                  showCorrectBorder && !meta.error && meta.touched
                    ? 'green'
                    : 'accent.gray'
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