import { useCategories, useTransactions } from '@/hook'
import { IGetAllTransactionsQueryOptions, TransactionType } from '@/interfaces'
import React, { useEffect, useState } from 'react'
import { SelectInput } from '..'
import { FilterButtons, FilterInputs, FilterSelects, FilterWrapper } from './styles'
import { handleMaskValue } from '@/utils'
import { Broom, MagnifyingGlass } from '@phosphor-icons/react'
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

const initialFilterState = {
  description: '',
  amount: 0,
  category: '',
  type: '' as TransactionType
}
const Filter = () => {
  const { state } = useCategories()
  const { categories } = state
  const [masked, setMasked] = useState<string>('R$ 0,00')

  const [filterState, setFilterState] =
    React.useState<IGetAllTransactionsQueryOptions>(initialFilterState)

  const { handleGetAllTransactions } = useTransactions()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    const { name, value } = ev.target

    if (name === 'amount') {
      const numericValue = value.replace(/[^0-9]/g, '') || '0'

      const floatValue = parseInt(numericValue) / 100

      setFilterState(prev => ({
        ...prev,
        [name]: Number(floatValue) || 0
      }))
      return
    }

    setFilterState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const keys = Object.keys(filterState)
    const values = Object.values(filterState)

    const filteredState = keys.reduce((acc, key, index) => {
      if (values[index]) {
        return {
          ...acc,
          [key]: values[index]
        }
      }
      return acc
    }, {})
    try {
      await handleGetAllTransactions(filteredState)
    } catch (err) {
      console.error(err)
    } finally {
      setFilterState(initialFilterState)
    }
  }

  const handleClear = () => {
    setFilterState(initialFilterState)
  }

  useEffect(() => {
    handleMaskValue(filterState.amount || 0, setMasked)
  }, [filterState.amount])

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
            placeholder='Descrição'
          />
        </div>
        <div>
          <input
            type='text'
            name='amount'
            id='amount'
            value={masked}
            onChange={handleChange}
            placeholder='Valores'
          />
        </div>
      </FilterInputs>

      <FilterSelects>
        <div>
          <div>
            <SelectInput
              name='category'
              options={categories.map(category => ({
                label: category.name,
                value: category.name
              }))}
              onChange={value =>
                setFilterState({
                  ...filterState,
                  category: value
                })
              }
              value={{
                label:
                  categories.find(category => category.name === filterState.category)?.name ||
                  'Selecione uma categoria',
                value: filterState.category
              }}
              placeholder='Categoria'
              backgroundProp='#fff'
              colorProp='#001E0F'
              boxShadowProp='0 0 0 1px #37AA5C'
              variant='secondary'
            />
          </div>
          <div>
            <SelectInput
              name='type'
              placeholder='Tipo de transação'
              options={types}
              value={{
                label:
                  types.find(type => type.value === filterState.type)?.label ||
                  'Selecione um tipo de transação',
                value: filterState.type
              }}
              onChange={value =>
                setFilterState({
                  ...filterState,
                  type: value as TransactionType
                })
              }
              backgroundProp='#fff'
              colorProp='#001E0F'
              boxShadowProp='0 0 0 1px #37AA5C'
              variant='secondary'
            />
          </div>
        </div>
        <FilterButtons>
          <button onClick={handleClear}>
            <Broom size={32} weight='bold' />
            Limpar
          </button>
          <button type='submit'>
            <MagnifyingGlass size={32} weight='bold' />
            filtrar
          </button>
        </FilterButtons>
      </FilterSelects>
    </FilterWrapper>
  )
}

export default Filter
