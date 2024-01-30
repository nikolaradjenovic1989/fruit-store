import { Fruit, Status } from '../api'

export const encodeBase64Image = (image: File) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onloadend = () => resolve(reader.result as string)
  })

export const getActiveTab = (fruits: Fruit[]): Status => {
  const unique = [...new Set(fruits.map(({ status }) => status))]

  if (unique.includes('hot') || unique.length === 0) {
    return 'hot'
  } else if (unique.includes('new')) {
    return 'new'
  } else if (unique.includes('recommend')) {
    return 'recommend'
  }

  return 'all'
}

export const generateId = () => Math.random().toString(20).substring(2, 8)
