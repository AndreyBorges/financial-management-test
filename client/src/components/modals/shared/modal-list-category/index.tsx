import { useCategories, useModal } from '@/hook'

import { CaretLeft, PencilSimpleLine, X } from '@phosphor-icons/react'
import { FC, useEffect } from 'react'

import { BackDrop, Button } from '@/components'
import { ICategory, ModalType } from '@/interfaces'
import { capitalizeString } from '@/utils'
import { CategoryNotFound, Loading } from '..'
import { ModalBody, ModalCategoryWrapper, ModalHeader } from './styles'

const CategoryItem: FC<ICategory> = category => {
  const { handleGetCurrentCategory } = useCategories()
  const { handleOpenModal } = useModal()

  return (
    <li key={category.id}>
      <span>{capitalizeString(category.name)}</span>
      <div>
        <PencilSimpleLine
          size={24}
          weight='bold'
          onClick={() => {
            handleGetCurrentCategory(category)
            handleOpenModal(ModalType.EDIT_CATEGORY)
          }}
        />
        <X
          size={24}
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
  const { state, handleRefreshCategory } = useCategories()
  const { handleOpenModal, state: modalState } = useModal()
  const { isLoading, categories } = state
  const { prevModal } = modalState

  useEffect(() => {
    handleRefreshCategory()
  }, [])

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
        {categories.length === 0 ? (
          <CategoryNotFound />
        ) : (
          <ModalBody>
            <ul>
              {categories.map(category => (
                <CategoryItem key={category.id} {...category} />
              ))}
            </ul>
          </ModalBody>
        )}
        <Button variant='primary' onClick={() => handleOpenModal(ModalType.CREATE_CATEGORY)}>
          Nova Categoria
        </Button>
      </ModalCategoryWrapper>
      <BackDrop />
    </>
  )
}

export default ModalListCategories
