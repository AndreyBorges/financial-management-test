import { Layout, Modals, TransactionsTable } from '@/components'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  return (
    <Layout>
      <TransactionsTable />
      <Modals />
      <ToastContainer />
    </Layout>
  )
}

export default Home
