import { ICategory, ICreateCategoryDTO, IUpdadeCategoryDTO } from '@/interfaces'
import { categoriesService } from '@/services'
import { categoryAtom } from '@/store'
import { useAtom } from 'jotai'

const useCategories = () => {
  const [state, setState] = useAtom(categoryAtom)
  const { refreshData } = state

  const handleGetAllCategories = async () => {
    setState({ isLoading: true })
    const { data, error, success } = await categoriesService.getAll()
    if (success && data)
      setState({
        categories: data.data
      })
    if (error) setState({ error: error.message })
    setState({ isLoading: false })
  }

  const handleCreateCategory = async (createTransactionDTO: ICreateCategoryDTO) => {
    setState({ isLoading: true })

    const { data, error, success } = await categoriesService.create(createTransactionDTO)

    if (success && data) setState({ success: data.message })
    if (error) setState({ error: error.message })
    handleRefreshCategory()
    setState({ isLoading: false })
  }

  const handleDeleteCategory = async (id: number) => {
    setState({ isLoading: true })

    const { data, error, success } = await categoriesService.remove({ id })
    if (success && data) setState({ success: data.message })
    if (error) setState({ error: error.message })
    handleRefreshCategory()
    setState({ isLoading: false })
  }

  const handleUpdateCategory = async (updateTransactionDTO: IUpdadeCategoryDTO) => {
    setState({ isLoading: true })

    const { data, error, success } = await categoriesService.update(updateTransactionDTO)
    if (success && data) setState({ success: data.message })
    if (error) setState({ error: error.message })
    handleRefreshCategory()

    setState({ isLoading: false })
  }

  const handleGetCurrentCategory = (category: ICategory) => {
    setState({
      currentCategory: category
    })
  }

  const handleRefreshCategory = () => {
    setState({ refreshData: !refreshData })
  }

  return {
    state,
    handleCreateCategory,
    handleDeleteCategory,
    handleGetAllCategories,
    handleUpdateCategory,
    handleGetCurrentCategory,
    handleRefreshCategory
  }
}

export default useCategories
