import { useAtom } from 'jotai'
import { reportsAtom } from '@/store'
import { reportsService } from '@/services'

const useReports = () => {
  const [state, setState] = useAtom(reportsAtom)
  const { error, isLoading, state: reportsState } = state
  const handleGetAllReports = async () => {
    setState({ isLoading: true })
    const { data, error, success } = await reportsService.getAll()
    if (success && data)
      setState({
        state: data.data
      })
    if (error) setState({ error: error.message })
    setState({ isLoading: false })
  }

  return {
    state: reportsState,
    handleGetAllReports,
    error,
    isLoading
  }
}

export default useReports
