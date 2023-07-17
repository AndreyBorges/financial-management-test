import { capitalizeString } from '@/utils'
import { FC, useEffect, useState } from 'react'
import { StyledSelect } from './styles'

interface ISelectInputProps {
  options: any[]
  onChange: (value: string) => void
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void
  defaultValue?: {
    label?: string
    value?: string
  }
  variant?: keyof typeof customStyles
  placeholder?: string
  isSearchable?: boolean
  name?: string
  backgroundProp?: string
  colorProp?: string
  boxShadowProp?: string
  value?: {
    label?: string
    value?: string
  }
  isDisabled?: boolean
}

const customStyles = {
  primary: {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#001E0F' : '#000f07'
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      boxShadow: state.isFocused ? '0 0 0 0' : provided.boxShadow,
      '&:hover': {
        boxShadow: state.isFocused ? '0 0 0 0' : provided.boxShadow
      }
    })
  },
  secondary: {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#99d6b7' : '#fff'
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      boxShadow: state.isFocused ? '0 0 0 1px #99d6b7' : provided.boxShadow,
      '&:hover': {
        boxShadow: state.isFocused ? '0 0 0 1px #99d6b7' : provided.boxShadow
      }
    })
  }
}

const SelectInput: FC<ISelectInputProps> = ({
  options,
  onChange,
  onBlur,
  defaultValue,
  variant = 'primary',
  placeholder = 'Selecione uma categoria',
  isSearchable = true,
  name = 'category',
  backgroundProp,
  colorProp,
  boxShadowProp,
  value,
  isDisabled
}) => {
  const [currOptions, setCurrOptions] = useState<
    {
      label: string
      value: string
    }[]
  >([])

  useEffect(() => {
    const currOptions = options.map(option => {
      return {
        label: capitalizeString(option.label),
        value: option.value
      }
    })

    setCurrOptions(currOptions)
  }, [options])

  const handleChange = (opt: (typeof currOptions)[0]) => {
    onChange(opt.value)
  }

  const checkValue = value?.label

  const currValue = {
    label: checkValue ? capitalizeString(checkValue) : placeholder,
    value: value?.value
  }

  return (
    <StyledSelect
      placeholder={placeholder}
      isSearchable={isSearchable}
      defaultValue={defaultValue}
      name={name}
      id={name}
      instanceId={name}
      isDisabled={isDisabled}
      options={currOptions}
      value={currValue}
      onChange={value => handleChange(value as (typeof currOptions)[0])}
      onBlur={onBlur}
      styles={customStyles[variant]}
      {...{ backgroundProp, colorProp, boxShadowProp }}
    />
  )
}

export default SelectInput
