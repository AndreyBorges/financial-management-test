import { BackDrop, Button } from '@/components'
import { useCategories, useModal, useTransactions } from '@/hook'
import { ICreateCategoryDTO, ModalType } from '@/interfaces'
import { CaretLeft, SpinnerGap } from '@phosphor-icons/react'
import React, { FC, useState } from 'react'
import * as yup from 'yup'
import { Loading } from '..'
import { ContainerInputWrapper, ModalBody, ModalCategoryWrapper, ModalHeader } from './styles'

const initalState = {
  name: ''
}

const initialErrorState = {
  name: ''
}

const formValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('A categoria é obrigatória')
    .min(3, 'A categoria deve ter no mínimo 3 caracteres')
})

const ModalEditCategory: FC = () => {
  const { handleUpdateCategory, state: atomState } = useCategories()
  const { handleOpenModal } = useModal()
  const { handleRefreshTransactions } = useTransactions()

  const { isLoading, currentCategory } = atomState
  const [state, setState] = useState<ICreateCategoryDTO>(currentCategory)
  const [errors, setErrors] = useState<typeof initialErrorState>(initialErrorState)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    const { name, value } = ev.target

    setState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    try {
      await formValidationSchema.validateAt(name, {
        [name]: value
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
      handleUpdateCategory({
        id: Number(currentCategory.id),
        name: state.name
      })
      setState(initalState)
    } catch (err) {
      const errors = err as yup.ValidationError
      const errorsMessages = errors.inner.reduce((acc, error) => {
        acc[error.path as keyof typeof initialErrorState] = error.message
        return acc
      }, {} as typeof initialErrorState)

      setErrors(errorsMessages)
    } finally {
      handleOpenModal(ModalType.LIST_CATEGORY)
      handleRefreshTransactions()
    }
  }

  if (isLoading || !currentCategory) return <Loading />

  return (
    <>
      <ModalCategoryWrapper>
        <ModalHeader>
          <h1>Editar Categoria</h1>
          <div onClick={() => handleOpenModal(ModalType.LIST_CATEGORY)}>
            <CaretLeft size={24} weight='bold' />
            <span>Voltar</span>
          </div>
        </ModalHeader>

        <ModalBody onSubmit={handleSubmit}>
          <ContainerInputWrapper>
            <div>
              <input
                type='text'
                name='name'
                placeholder='Categoria'
                value={state.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>{errors.name}</span>
            </div>
          </ContainerInputWrapper>

          <Button variant='primary' type='submit'>
            {isLoading ? <SpinnerGap size={32} weight='bold' /> : 'Editar categoria'}
          </Button>
        </ModalBody>
      </ModalCategoryWrapper>
      <BackDrop />
    </>
  )
}

export default ModalEditCategory
