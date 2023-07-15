import { useTransactions } from '@/hook'
import { ICreateTransactionDTO, TransactionType } from '@/interfaces'
import { ArrowCircleDown, ArrowCircleUp, SpinnerGap, X } from 'phosphor-react'
import React, { FC, useState } from 'react'
import * as yup from 'yup'
import { Button } from '..'
import BackDrop from '../back-drop'
import {
  ContainerInputWrapper,
  ModalBody,
  ModalHeader,
  ModalTransactionWrapper,
  TransactionsButtonType,
  TransactionsType
} from './styles'

interface IModalTransactionProps {
  handleOpenModal: () => void
}

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
  category: yup
    .string()
    .required('A categoria é obrigatória')
    .min(3, 'A categoria deve ter no mínimo 3 caracteres'),
  description: yup
    .string()
    .required('A descrição é obrigatória')
    .min(3, 'A descrição deve ter no mínimo 3 caracteres')
})

const ModalTransaction: FC<IModalTransactionProps> = ({ handleOpenModal }) => {
  const { handleCreateTransaction, state: atomState } = useTransactions()
  const { isLoading } = atomState
  const [state, setState] = useState<ICreateTransactionDTO>(initalState)
  const [masked, setMasked] = useState<string>('R$ 0,00')
  const [errors, setErrors] = useState<typeof initialErrorState>(initialErrorState)

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

  const handleCLoseModal = () => {
    setState(initalState)
    handleOpenModal()
  }

  const handleValidateForm = async () => {
    try {
      await formValidationSchema.validate(state, { abortEarly: false })
    } catch (err) {
      const errors = err as yup.ValidationError
      const errorsMessages = errors.inner.reduce((acc, error) => {
        acc[error.path as keyof typeof initialErrorState] = error.message
        return acc
      }, {} as typeof initialErrorState)

      setErrors(errorsMessages)
    }
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async ev => {
    ev.preventDefault()
    try {
      await formValidationSchema.validate(state, { abortEarly: false })
    } catch (err) {
      const errors = err as yup.ValidationError
      const errorsMessages = errors.inner.reduce((acc, error) => {
        acc[error.path as keyof typeof initialErrorState] = error.message
        return acc
      }, {} as typeof initialErrorState)

      setErrors(errorsMessages)
    }
    handleCreateTransaction(state)
    handleCLoseModal()
  }

  return (
    <>
      <ModalTransactionWrapper>
        <ModalHeader>
          <h1>Nova Transação</h1>
          <X size={32} onClick={handleCLoseModal} />
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
              <input
                type='text'
                name='category'
                placeholder='Categoria'
                value={state.category}
                onChange={handleChange}
                onBlur={handleBlur}
              />
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
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionsButtonType>
            <TransactionsButtonType
              variant='outcome'
              value='outcome'
              onClick={() => setState(prev => ({ ...prev, type: TransactionType.OUTCOME }))}
              checked={state.type === TransactionType.OUTCOME}
            >
              <ArrowCircleDown size={24} />
              Saida
            </TransactionsButtonType>
          </TransactionsType>
          <Button variant='primary'>
            {isLoading ? <SpinnerGap size={32} weight='bold' /> : 'Finalizar Transação'}
          </Button>
        </ModalBody>
      </ModalTransactionWrapper>
      <BackDrop onClick={handleCLoseModal} />
    </>
  )
}

export default ModalTransaction
