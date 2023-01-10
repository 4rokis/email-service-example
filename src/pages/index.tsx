import { Loader } from '@/components/Loader'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <h1>Home</h1>
      <Loader />
    </div>
  )
}
export default Home
