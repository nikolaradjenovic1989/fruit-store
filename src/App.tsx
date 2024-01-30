import { useEffect, useState } from 'react'
import {
  AddFruitForm,
  Button,
  DeleteList,
  FruitList,
  Modal,
} from './components'
import {
  getFruitsFromLocalStorage,
  initialFruits,
  saveFruitsToLocalStorage,
  useFruitsQuery,
} from './api'

function App() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const {
    data: fruits = [],
    isLoading,
    isRefetching,
  } = useFruitsQuery(shouldLoad)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // set initial state in local storage since we don't have real api
  useEffect(() => {
    const fruitsFromStorage = getFruitsFromLocalStorage()

    if (!fruitsFromStorage) {
      saveFruitsToLocalStorage(initialFruits)
    }
  }, [])

  const handleCloseModal = () => {
    setShouldLoad(false)
    setShowAddModal(false)
    setShowDeleteModal(false)
  }

  return (
    <div className="px-10 pb-5 sm:px-32 sm:pb-20 gap-x-20">
      <div className="flex flex-col border-b border-border pb-9 mb-6 sm:mb-16">
        <h3 className="flex mobile-center font-semibold text-5xl sm:text-6xl tracking-normal py-6 sm:py-12">
          Fruit Store
        </h3>

        {/* add fruit modal */}
        <Modal
          content={<AddFruitForm onClose={handleCloseModal} />}
          isOpen={showAddModal}
          title="Add Fruit"
        />

        {/* delete fruit modal */}
        <Modal
          content={<DeleteList />}
          isOpen={showDeleteModal}
          onClose={handleCloseModal}
          title="Delete Fruit"
        />

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
            onClick={() => setShowAddModal(true)}
            value="Add"
          />
          <Button
            className="btn-primary"
            disabled={isLoading}
            onClick={() => setShowDeleteModal(true)}
            value="Delete"
          />
        </div>
      </div>

      <FruitList isLoading={isLoading || isRefetching} fruits={fruits} />
    </div>
  )
}

export default App
