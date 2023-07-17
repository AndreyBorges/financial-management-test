import { useAtom } from 'jotai'
import { filterAtom, filterDefaultValue } from '@/store'
import useTransactions from './useTransactions'

const useFilter = () => {
  const [state, setFilterState] = useAtom(filterAtom)
  const { handleGetAllTransactions } = useTransactions()

  const { filterState } = state

  const handleClearFilter = () => {
    setFilterState({ filterState: filterDefaultValue.filterState })
  }
  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
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
    }
  }

  return {
    filterState,
    setFilterState,
    handleClearFilter,
    handleSubmit
  }
}

export default useFilter
