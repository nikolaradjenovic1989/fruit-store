export type Status = 'hot' | 'new' | 'recommend' | 'all'

export type Fruit = {
  country: string
  description: string
  image: string
  name: string
  price: number
  status: Status
}
