import { useCategories, useModal } from '@/hook'
import { ICreateCategoryDTO, IModal, ModalType } from '@/interfaces'
import { CaretLeft, SpinnerGap, X } from 'phosphor-react'
import React, { FC, useState } from 'react'
import * as yup from 'yup'
import { Button, BackDrop } from '@/components'
import { ContainerInputWrapper, ModalBody, ModalHeader, ModalCategoryWrapper } from './styles'
import Loading from '../loading'


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

const ModalCategory: FC= () => {
  const { handleCreateCategory, state: atomState } = useCategories()
  const { handleOpenModal, state: modalState } = useModal()
  const { prevModal } = modalState
  const { isLoading } = atomState
  const [state, setState] = useState<ICreateCategoryDTO>(initalState)
  const [errors, setErrors] = useState<typeof initialErrorState>(initialErrorState)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
    const { name, value } = ev.target

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
      handleCreateCategory(state)
      setState(initalState)
      handleOpenModal(prevModal)
    } catch (err) {
      const errors = err as yup.ValidationError
      const errorsMessages = errors.inner.reduce((acc, error) => {
        acc[error.path as keyof typeof initialErrorState] = error.message
        return acc
      }, {} as typeof initialErrorState)

      setErrors(errorsMessages)
    }
  }

  return (
    <>
      <ModalCategoryWrapper>
        <ModalHeader>
          <h1>Nova Categoria</h1>
          <div onClick={() => handleOpenModal(prevModal)}>
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

          <Button variant='primary'>
            {isLoading ? <SpinnerGap size={32} weight='bold' /> : 'Adicionar categoria'}
          </Button>
        </ModalBody>
      </ModalCategoryWrapper>
      <BackDrop onClick={handleCloseModal} />
    </>
  )
}

export default ModalCategory
