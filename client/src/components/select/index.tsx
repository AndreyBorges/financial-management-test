import { FC, useEffect, useState } from 'react'
import { ICategory } from '@/interfaces'
import { StyledSelect } from './styles'

interface ISelectInputProps {
  options: ICategory[]
  onChange: (value: string) => void
  onBlur: (ev: React.FocusEvent<HTMLInputElement>) => void
  defaultValue?: {
    label?: string
    value?: string
  }
}

const customStyles = {
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
}

const SelectInput: FC<ISelectInputProps> = ({ options, onChange, onBlur, defaultValue }) => {
  const [currOptions, setCurrOptions] = useState<
    {
      label: string
      value: string
    }[]
  >([])

  useEffect(() => {
    const currOptions = options.map(option => {
      return {
        label: option.name,
        value: option.name
      }
    })

    setCurrOptions(currOptions)
  }, [options])

  const handleChange = (opt: (typeof currOptions)[0]) => {
    onChange(opt.value)
  }

  return (
    <StyledSelect
      placeholder={'Selecione uma categoria'}
      isSearchable={true}
      defaultValue={defaultValue}
      name='category'
      options={currOptions}
      onChange={value => handleChange(value as (typeof currOptions)[0])}
      onBlur={onBlur}
      styles={customStyles}
    />
  )
}

export default SelectInput
