import TitleBox from '@components/home/TitleBox'
import ResultBox from '@components/home/ResultBox'
import { getLottory } from '@utils/lottory'

// export const revalidate = 10

const HomePage = async () => {
  const lottory = await getLottory()

  if (!lottory) {
    return <div>NOT FOUND</div>
  }

  return (
    <main>
      <TitleBox date={lottory.date} />

      <ResultBox {...lottory} />
    </main>
  )
}

export default HomePage
