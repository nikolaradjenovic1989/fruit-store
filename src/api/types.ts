export type Status = 'hot' | 'new' | 'recommend' | 'all'

export type Fruit = {
  id: string
  country: string
  description: string
  image: string
  name: string
  price: number
  status: Status
}

export const flags = {
  America: '🇺🇸',
  England: '🇬🇧',
  Japan: '🇯🇵',
}
