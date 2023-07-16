import { useCategories, useModal, useTransactions } from '@/hook'
import { ICreateTransactionDTO, IModal, ModalType, TransactionType } from '@/interfaces'
import { ArrowCircleDown, ArrowCircleUp, Gear, GearSix, SpinnerGap, X } from 'phosphor-react'
import React, { FC, use, useEffect, useState } from 'react'
import * as yup from 'yup'
import { Button, BackDrop, SelectInput } from '@/components'
import {
  ContainerInputWrapper,
  ModalBody,
  ModalHeader,
  ModalTransactionWrapper,
  SelectBoxWrapper,
  TransactionsButtonType,
  TransactionsType
} from './styles'
import Loading from '../loading'

const initalState = {
  amount: 0,
  category: '',
  type: TransactionType.OUTCOME,
  description: ''
}

const initialErrorState = {
  amount: '',
  category: '',
  description: ''
}

const formValidationSchema = yup.object().shape({
  amount: yup
    .number()
    .required('O valor é obrigatório')
    .min(0.01, 'O valor deve ser maior que 0.01'),
  category: yup.string().required('É necessário criar/selecionar uma categoria'),
  description: yup
    .string()
    .required('A descrição é obrigatória')
    .min(3, 'A descrição deve ter no mínimo 3 caracteres')
})

const ModalTransaction: FC = () => {
  const { handleCreateTransaction, state: transactionState } = useTransactions()
  const { state: categoryState } = useCategories()
  const {handleOpenModal} = useModal()

  const { categories, isLoading: isCategoriesLoading } = categoryState
  const { isLoading } = transactionState
  const [state, setState] = useState<ICreateTransactionDTO>(initalState)
  const [masked, setMasked] = useState<string>('R$ 0,00')
  const [errors, setErrors] = useState<typeof initialErrorState>(initialErrorState)

  useEffect(() => {
    if (state.category === 'new') {
      handleOpenModal(ModalType.CREATE_CATEGORY)
    }
  }, [state.category])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    const { name, value } = ev.target

    if (name === 'amount') {
      const numericValue = value.replace(/[^0-9]/g, '') || '0'

      const floatValue = parseInt(numericValue) / 100

      const formattedValue = floatValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      setMasked(formattedValue)

      setState(prev => ({
        ...prev,
        [name]: Number(floatValue) || 0
      }))
      return
    }

    setState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCloseModal = () => {
    setState(initalState)
    handleOpenModal()
  }

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    try {
      await formValidationSchema.validateAt(name, {
        [name]: name === 'amount' ? state.amount : value
      })

      // Limpa o erro do campo, caso exista
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined
      }))
    } catch (err: any) {
      // Erro de validação encontrado para o campo específico
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: err.message
      }))
    }
  }

  const validate = async (name: string, value?: string) => {
    try {
      await formValidationSchema.validateAt(name, {
        [name]: value || state[name as keyof typeof state]
      })
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined
      }))
    } catch (err: any) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: err.message
      }))
    }
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async ev => {
    ev.preventDefault()
    try {
      await formValidationSchema.validate(state, { abortEarly: false })
      handleCreateTransaction(state)
      handleCloseModal()
    } catch (err) {
      const errors = err as yup.ValidationError
      const errorsMessages = errors.inner.reduce((acc, error) => {
        acc[error.path as keyof typeof initialErrorState] = error.message
        return acc
      }, {} as typeof initialErrorState)

      setErrors(errorsMessages)
    }
  }

  if (isLoading || isCategoriesLoading) return <Loading />

  return (
    <>
      <ModalTransactionWrapper>
        <ModalHeader>
          <h1>Nova Transação</h1>
          <X size={32} onClick={handleCloseModal} />
        </ModalHeader>

        <ModalBody onSubmit={handleSubmit}>
          <ContainerInputWrapper>
            <div>
              <input
                type='text'
                name='description'
                placeholder='Descrição'
                value={state.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>{errors.description}</span>
            </div>
            <div>
              <input
                type='text'
                name='amount'
                value={masked}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>{errors.amount}</span>
            </div>
            <div>
              <SelectBoxWrapper>
                <SelectInput
                  options={categories}
                  onChange={async (value: string) => {
                    const { name } = { name: 'category' }

                    await validate(name, value)
                    setState(prev => ({
                      ...prev,
                      category: value
                    }))
                  }}
                  onBlur={handleBlur}
                />
                <GearSix size={42} onClick={() => handleOpenModal(ModalType.LIST_CATEGORY)} />
              </SelectBoxWrapper>
              <span>{errors.category}</span>
            </div>
          </ContainerInputWrapper>

          <TransactionsType>
            <TransactionsButtonType
              variant='income'
              value='income'
              onClick={() => setState(prev => ({ ...prev, type: TransactionType.INCOME }))}
              checked={state.type === TransactionType.INCOME}
            >
              <ArrowCircleUp weight='bold' size={24} />
              Entrada
            </TransactionsButtonType>
            <TransactionsButtonType
              variant='outcome'
              value='outcome'
              onClick={() => setState(prev => ({ ...prev, type: TransactionType.OUTCOME }))}
              checked={state.type === TransactionType.OUTCOME}
            >
              <ArrowCircleDown weight='bold' size={24} />
              Saida
            </TransactionsButtonType>
          </TransactionsType>
          <Button variant='primary'>
            {isLoading ? <SpinnerGap size={32} weight='bold' /> : 'Finalizar Transação'}
          </Button>
        </ModalBody>
      </ModalTransactionWrapper>
      <BackDrop onClick={handleCloseModal} />
    </>
  )
}

export default ModalTransaction
