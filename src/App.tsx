import { useEffect, useState } from 'react'
import Button from './components/Form/Button'
import FruitList from './components/FruitList'
import {
  getFruitsFromLocalStorage,
  initialFruits,
  saveFruitsToLocalStorage,
  useFruitsQuery,
} from './api'

function App() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const { data: fruits = [], isLoading } = useFruitsQuery(shouldLoad)

  // set initial state in local storage since we don't have real api
  useEffect(() => {
    const fruitsFromStorage = getFruitsFromLocalStorage()

    if (!fruitsFromStorage) {
      saveFruitsToLocalStorage(initialFruits)
    }
  }, [])

  return (
    <div className="px-10 pb-5 sm:px-32 sm:pb-20 gap-x-20">
      <div className="flex flex-col border-b border-border pb-9 mb-6 sm:mb-16">
        <div className="flex mobile-center font-semibold text-5xl sm:text-6xl tracking-normal py-6 sm:py-12">
          Fruit Store
        </div>

        <div className="flex gap-2 mobile-center">
          <Button
            className="btn-primary"
            disabled={isLoading}
            onClick={() => setShouldLoad(true)}
            value="Load"
          />
          <Button
            className="btn-primary"
            disabled={isLoading}
            onClick={() => console.info('add')}
            value="Add"
          />
          <Button
            className="btn-primary"
            disabled={isLoading}
            onClick={() => console.info('delete')}
            value="Delete"
          />
        </div>
      </div>

      <FruitList fruits={fruits} />
    </div>
  )
}

export default App
