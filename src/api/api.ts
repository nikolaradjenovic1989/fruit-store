import { QueryClient, useQuery } from 'react-query'
import { Fruit } from './types'
import fruits from './mock_data_load.json'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
})

export const initialFruits = fruits as Fruit[]

export const getFruitsFromLocalStorage = () => localStorage.getItem('fruits')

export const saveFruitsToLocalStorage = (fruits: Fruit[]) =>
  localStorage.setItem('fruits', JSON.stringify(fruits))

export const useFruitsQuery = (shouldLoad: boolean) =>
  useQuery<Fruit[]>({
    enabled: shouldLoad,
    queryKey: ['fruits'],
    queryFn: () =>
      new Promise((res) => {
        const fruits = JSON.parse(getFruitsFromLocalStorage()!) as Fruit[]
        setTimeout(() => res(fruits), 1000)
      }),
  })

export const addFruit = (fruitForSave: Fruit) => {
  const fruitsFromStorage = JSON.parse(getFruitsFromLocalStorage()!) as Fruit[]
  fruitsFromStorage.push(fruitForSave)

  saveFruitsToLocalStorage(fruitsFromStorage)
}

export const deleteFruit = (deleteId: string) => {
  const fruitsFromStorage = JSON.parse(getFruitsFromLocalStorage()!) as Fruit[]
  const newFruits = fruitsFromStorage.filter(({ id }) => id !== deleteId)

  saveFruitsToLocalStorage(newFruits)
}
