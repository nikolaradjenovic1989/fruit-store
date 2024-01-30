export type Status = 'hot' | 'new' | 'recommend' | 'all'

export type Fruit = {
  id: string
  country: string
  description: string
  image: string
  name: string
  price: string
  status: Status
}

export const flags = {
  America: '🇺🇸',
  England: '🇬🇧',
  Japan: '🇯🇵',
}
