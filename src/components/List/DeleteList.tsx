import { useState } from 'react'
import { Fruit, deleteFruit, getFruitsFromLocalStorage } from '../../api'

const DeleteList = () => {
  const [fruits, setFruits] = useState<Fruit[]>(
    () => JSON.parse(getFruitsFromLocalStorage()!) as Fruit[]
  )
  return (
    <table className="w-full mt-6 rounded-lg text-sm">
      <thead className="bg-btn-secondary-focus font-semibold text-white/[.72]">
        <tr>
          <th className="py-3 px-4">Tab</th>
          <th className="py-3 px-4">Country</th>
          <th className="py-3 px-4">Fruit</th>
          <th className="py-3 px-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {fruits.length > 0 ? (
          fruits.map(({ id, status, country, name }, i) => (
            <tr
              key={id}
              className={`${
                i % 2 === 0 ? 'bg-btn-secondary' : 'bg-btn-secondary-hover'
              } text-center`}
            >
              <td className="px-3.5 py-2 break-word">{status}</td>
              <td className="px-3.5 py-2 break-words">{country}</td>
              <td className="px-3.5 py-2 break-words">{name}</td>
              <td
                className="px-3.5 py-2 break-words text-delete cursor-pointer"
                onClick={() => {
                  // remove from table in modal
                  setFruits(
                    fruits.filter(({ id: deleteId }) => id !== deleteId)
                  )
                  // remove from local storage (api)
                  deleteFruit(id)
                }}
              >
                Delete
              </td>
            </tr>
          ))
        ) : (
          <tr className="text-center h-32">
            <td colSpan={4}>No Fruits.</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default DeleteList
