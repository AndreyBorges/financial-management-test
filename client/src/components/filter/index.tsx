import { useCategories, useFilter } from '@/hook'
import { TransactionType } from '@/interfaces'
import { capitalizeString, handleMaskValue } from '@/utils'
import { Broom, MagnifyingGlass } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import { SelectInput } from '..'
import {
  FilterButtons,
  FilterInputs,
  FilterSelects,
  FilterWrapper,
  RangeInputWrapper
} from './styles'
const types = [
  {
    label: 'Entrada',
    value: TransactionType.INCOME
  },
  {
    label: 'Saída',
    value: TransactionType.OUTCOME
  }
]

const Filter = () => {
  const { state } = useCategories()
  const { categories } = state
  const [maskedGTE, setMaskedGTE] = useState<string>('R$ 0,00')
  const [maskedLTE, setMaskedLTE] = useState<string>('R$ 0,00')
  const { handleClearFilter, setFilterState, filterState, handleSubmit } = useFilter()
  const { isLoading } = state

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    const { name, value } = ev.target

    if (name === 'gte' || name === 'lte') {
      const numericValue = value.replace(/[^0-9]/g, '') || '0'

      const floatValue = parseInt(numericValue) / 100

      setFilterState({
        filterState: {
          ...filterState,
          [name]: Number(floatValue) || 0
        }
      })
      return
    }

    setFilterState({
      filterState: {
        ...filterState,
        [name]: value
      }
    })
  }

  useEffect(() => {
    handleMaskValue(filterState.lte || 0, setMaskedLTE)
  }, [filterState.lte])
  useEffect(() => {
    handleMaskValue(filterState.gte || 0, setMaskedGTE)
  }, [filterState.gte])

  const label = categories.find(category => category.name === filterState.category)?.name

  const value = {
    label: label,
    value: filterState.category
  }

  return (
    <FilterWrapper onSubmit={handleSubmit}>
      <h1>Filtro das transações</h1>
      <FilterInputs>
        <div>
          <input
            type='text'
            name='description'
            id='description'
            value={filterState.description}
            onChange={handleChange}
            placeholder='Digite uma descrição'
            disabled={isLoading}
          />
        </div>
        <RangeInputWrapper>
          <div>
            <span>Valor minimo</span>
            <input
              id='gte'
              type='text'
              name='gte'
              value={maskedGTE}
              onChange={handleChange}
              placeholder='Valor mínimo'
              disabled={isLoading}
            />
          </div>

          <div>
            <span>Valor maximo</span>
            <input
              id='lte'
              type='text'
              name='lte'
              value={maskedLTE}
              onChange={handleChange}
              placeholder='Valor mínimo'
              disabled={isLoading}
            />
          </div>
        </RangeInputWrapper>
      </FilterInputs>

      <FilterSelects>
        <div>
          <div>
            <SelectInput
              name='category'
              options={categories.map(category => ({
                label: capitalizeString(category.name),
                value: category.name
              }))}
              onChange={value =>
                setFilterState({
                  filterState: {
                    ...filterState,
                    category: value as string
                  }
                })
              }
              isDisabled={isLoading}
              value={value}
              placeholder='Selecione uma categoria'
              backgroundProp='#fff'
              colorProp='#001E0F'
              boxShadowProp='0 0 0 1px #37AA5C'
              variant='secondary'
            />
          </div>
          <div>
            <SelectInput
              name='type'
              placeholder='Selecione um tipo de transação'
              options={types}
              value={{
                label: types.find(type => type.value === filterState.type)?.label,
                value: filterState.type
              }}
              onChange={value =>
                setFilterState({
                  filterState: {
                    ...filterState,
                    type: value as TransactionType
                  }
                })
              }
              isDisabled={isLoading}
              backgroundProp='#fff'
              colorProp='#001E0F'
              boxShadowProp='0 0 0 1px #37AA5C'
              variant='secondary'
            />
          </div>
        </div>
        <FilterButtons>
          <button type='button' disabled={isLoading} onClick={handleClearFilter}>
            <Broom size={32} weight='bold' />
            Limpar
          </button>
          <button type='submit' disabled={isLoading}>
            <MagnifyingGlass size={32} weight='bold' />
            filtrar
          </button>
        </FilterButtons>
      </FilterSelects>
    </FilterWrapper>
  )
}

export default Filter
