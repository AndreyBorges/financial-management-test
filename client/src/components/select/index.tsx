import { FC, useEffect, useState } from 'react'
import { ICategory, TransactionType } from '@/interfaces'
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
  value
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
        label: option.label,
        value: option.value
      }
    })

    setCurrOptions(currOptions)
  }, [options])

  const handleChange = (opt: (typeof currOptions)[0]) => {
    onChange(opt.value)
  }

  return (
    <StyledSelect
      placeholder={placeholder}
      isSearchable={isSearchable}
      defaultValue={defaultValue}
      name={name}
      id={name}
      instanceId={name}
      options={currOptions}
      value={value}
      onChange={value => handleChange(value as (typeof currOptions)[0])}
      onBlur={onBlur}
      styles={customStyles[variant]}
      {...{ backgroundProp, colorProp, boxShadowProp }}
    />
  )
}

export default SelectInput
