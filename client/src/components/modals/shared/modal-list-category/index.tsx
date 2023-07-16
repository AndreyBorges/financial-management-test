import { useModal, useCategories } from '@/hook'

import { CaretLeft, GearSix, PencilSimpleLine, Trash, X } from 'phosphor-react'
import React, { FC } from 'react'

import { Button, BackDrop } from '@/components'
import { ModalBody, ModalCategoryWrapper, ModalFooter, ModalHeader } from './styles'
import { Loading } from '..'
import { ICategory, ModalType } from '@/interfaces'

const CategoryItem: FC<ICategory> = category => {
  const { handleGetCurrentCategory } = useCategories()
  const { handleOpenModal } = useModal()

  return (
    <li key={category.id}>
      <span>{category.name}</span>
      <div>
        <PencilSimpleLine
          size={32}
          weight='bold'
          onClick={() => {
            handleGetCurrentCategory(category)
            handleOpenModal(ModalType.EDIT_CATEGORY)
          }}
        />
        <X
          size={32}
          weight='bold'
          onClick={() => {
            handleGetCurrentCategory(category)
            handleOpenModal(ModalType.DELETE_CATEGORY)
          }}
        />
      </div>
    </li>
  )
}

const ModalListCategories: FC = () => {
  const { state } = useCategories()
  const { handleOpenModal, state: modalState } = useModal()
  const { isLoading, categories } = state
  const { prevModal } = modalState

  if (isLoading || !categories) return <Loading />

  return (
    <>
      <ModalCategoryWrapper>
        <ModalHeader>
          <h1>Lista de Categorias</h1>

          <div onClick={() => handleOpenModal(prevModal)}>
            <CaretLeft size={24} weight='bold' />
            <span>Voltar</span>
          </div>
        </ModalHeader>

        <ModalBody>
          <ul>
            {categories.map(category => (
              <CategoryItem key={category.id} {...category} />
            ))}
          </ul>
        </ModalBody>
        <Button variant='primary' onClick={() => handleOpenModal(ModalType.CREATE_CATEGORY)}>
          Nova Categoria
        </Button>
      </ModalCategoryWrapper>
      <BackDrop onClick={handleOpenModal} />
    </>
  )
}

export default ModalListCategories
