import { useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import { getActiveTab, imageUrl } from '../utils'
import groupBy from 'lodash/groupBy'
import { Fruit, Status } from '../api'

type FruitListProps = {
  fruits: Fruit[]
}

const FruitList = ({ fruits }: FruitListProps) => {
  const [activeTab, setActiveTab] = useState<Status>('hot')

  const tabClass = (active: boolean, className?: string) =>
    cn('py-3 px-4 sm:px-6 sm:py-4', className, {
      'bg-list': active,
      'opacity-65': !active,
    })

  const groupedByCountry = Object.values(groupBy(fruits, 'country'))

  const formatted = useMemo(
    () =>
      groupedByCountry
        .map((fruits) =>
          fruits.filter((fruit) =>
            activeTab === 'all' ? true : fruit.status === activeTab
          )
        )
        .filter((arr) => !!arr.length),
    [activeTab, groupedByCountry]
  )

  useEffect(() => {
    setActiveTab(getActiveTab(fruits))
  }, [fruits])

  return (
    <>
      <div className="font-semibold text-2xl mb-3">Fruit List</div>
      <div className="flex w-full sm:w-fit rounded-t-lg bg-tab cursor-pointer text-sm sm:text-base">
        <div
          className={tabClass(activeTab === 'hot', 'rounded-tl-lg')}
          onClick={() => setActiveTab('hot')}
        >
          Hot
        </div>
        <div
          className={tabClass(activeTab === 'new')}
          onClick={() => setActiveTab('new')}
        >
          New
        </div>
        <div
          className={tabClass(activeTab === 'recommend')}
          onClick={() => setActiveTab('recommend')}
        >
          Recommend
        </div>
        <div
          className={tabClass(activeTab === 'all', 'rounded-tr-lg')}
          onClick={() => setActiveTab('all')}
        >
          All
        </div>
      </div>

      {formatted.length > 0 && (
        <div className="bg-list pb-10 mb-4">
          {formatted.map((fruits, index) => (
            <div className="px-6 pt-10" key={`${fruits[0].country}-${index}`}>
              <div className="border-b border-border pb-1 mb-10">
                {fruits[0].country}
              </div>
              <div className="flex flex-col gap-y-5">
                {fruits.map(({ name, image, description, price }) => (
                  <div className="flex gap-7" key={name}>
                    <img
                      className="w-16 h-16 sm:w-32 sm:h-32 bg-white rounded-lg"
                      src={imageUrl(image)}
                    />
                    <div className="flex flex-col justify-between px-2 py-1">
                      <div>
                        <div className="font-semibold mb-2">{name}</div>
                        <p className="description opacity-75">{description}</p>
                      </div>
                      <div className="text-price text-lg font-bold mb-1">
                        $ {price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default FruitList
