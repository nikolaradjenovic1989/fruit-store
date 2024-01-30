import { Fruit, Status } from '../api'

export const imageUrl = (image: string) =>
  new URL(`../images/${image}`, import.meta.url).href

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
