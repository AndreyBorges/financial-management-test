import { Header, Layout, Modals, TransactionsTable } from '@/components'

const Home = () => {
  return (
    <Layout>
      <TransactionsTable />
      <Modals />
    </Layout>
  )
}

export default Home
