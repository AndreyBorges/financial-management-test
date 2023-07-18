import { BackDrop, Button, SelectInput } from '@/components'
import { useCategories, useMediaQuery, useModal, useTransactions } from '@/hook'
import { IUpdadeTransactionDTO, ModalType, TransactionType } from '@/interfaces'
import { handleMaskValue } from '@/utils'
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CaretLeft,
  GearSix,
  SpinnerGap,
  X
} from '@phosphor-icons/react'
import React, { FC, useEffect, useState } from 'react'
import * as yup from 'yup'
import { Loading } from '..'
import {
  ContainerInputWrapper,
  ModalBody,
  ModalHeader,
  ModalTransactionWrapper,
  SelectBoxWrapper,
  TransactionsButtonType,
  TransactionsType
} from './styles'

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
    .max(20, 'A descrição deve ter no máximo 20 caracteres')
    .min(3, 'A descrição deve ter no mínimo 3 caracteres')
})

const ModalEditTransaction: FC = () => {
  const {
    handleUpdateTransaction,
    state: transactionState,
    handleRefreshTransactions
  } = useTransactions()
  const isMobile = useMediaQuery('(max-width: 750px)')
  const { handleOpenModal, state: modalState } = useModal()
  const { prevModal, modalFlow } = modalState

  const { state: categoryState } = useCategories()
  const { categories, isLoading: isCategoriesLoading } = categoryState
  const { isLoading, currentTransaction } = transactionState

  const [state, setState] = useState<IUpdadeTransactionDTO>({
    category: currentTransaction?.category,
    amount: currentTransaction?.amount,
    description: currentTransaction?.description,
    type: currentTransaction?.type,
    id: currentTransaction?.id
  })
  const [masked, setMasked] = useState<string>('R$ 0,00')
  const [errors, setErrors] = useState<typeof initialErrorState>(initialErrorState)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    const { name, value } = ev.target

    if (name === 'amount') {
      const numericValue = value.replace(/[^0-9]/g, '') || '0'

      const floatValue = parseInt(numericValue) / 100

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
    handleOpenModal(isMobile ? prevModal : ModalType.NULL)
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
      handleUpdateTransaction(state)
      handleCloseModal()
    } catch (err) {
      const errors = err as yup.ValidationError
      const errorsMessages = errors.inner.reduce((acc, error) => {
        acc[error.path as keyof typeof initialErrorState] = error.message
        return acc
      }, {} as typeof initialErrorState)
      setErrors(errorsMessages)
    } finally {
      handleRefreshTransactions()
    }
  }
  useEffect(() => {
    handleMaskValue(state.amount || 0, setMasked)
  }, [state.amount])

  if (isLoading || isCategoriesLoading) return <Loading />

  return (
    <>
      <ModalTransactionWrapper>
        <ModalHeader>
          <h1>Editar Transação</h1>
          {ModalType.NULL === prevModal || ModalType.EDIT_TRANSACTION === modalFlow[0] ? (
            <div onClick={() => handleOpenModal(isMobile ? prevModal : ModalType.NULL)}>
              <X size={24} weight='bold' />
            </div>
          ) : (
            <div onClick={() => handleOpenModal(isMobile ? prevModal : ModalType.NULL)}>
              <CaretLeft size={24} weight='bold' />
              <span>Voltar</span>
            </div>
          )}
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
                  variant='secondary'
                  backgroundProp='#fff'
                  colorProp='#37AA5C'
                  boxShadowProp='0 0 0 1px #37AA5C'
                  value={{
                    value: state.category,
                    label: state.category
                  }}
                  options={categories.map(category => ({
                    label: category.name,
                    value: category.name
                  }))}
                  onChange={async (value: string) => {
                    const { name } = { name: 'category' }

                    await validate(name, value)
                    setState(prev => ({
                      ...prev,
                      category: value
                    }))
                  }}
                  onBlur={handleBlur}
                  defaultValue={{
                    value: state.category,
                    label: state.category
                  }}
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
            {isLoading ? <SpinnerGap size={32} weight='bold' /> : 'Editar Transação'}
          </Button>
        </ModalBody>
      </ModalTransactionWrapper>
      <BackDrop />
    </>
  )
}

export default ModalEditTransaction
