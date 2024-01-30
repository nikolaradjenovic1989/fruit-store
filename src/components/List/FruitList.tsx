import { useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import { getActiveTab, imageUrl } from '../../utils'
import groupBy from 'lodash/groupBy'
import { Fruit, Status, flags } from '../../api'
import { LoadingSpinner } from '..'

type FruitListProps = {
  isLoading: boolean
  fruits: Fruit[]
}

const FruitList = ({ isLoading, fruits }: FruitListProps) => {
  const [activeTab, setActiveTab] = useState<Status>('hot')

  const tabClass = (active: boolean, className?: string) =>
    cn('py-3 px-4 sm:px-6 sm:py-4', className, {
      'bg-btn-secondary-focus': active,
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

      {isLoading && <LoadingSpinner />}

      {formatted.length > 0 && !isLoading && (
        <div className="bg-btn-secondary-focus pb-10 mb-4 rounded-b-lg rounded-tr-lg">
          {formatted.map((fruits, index) => (
            <div className="px-6 pt-10" key={`${fruits[0].country}-${index}`}>
              <div className="border-b border-border pb-1 mb-10">
                {flags[fruits[0].country as keyof typeof flags]}{' '}
                {fruits[0].country}
              </div>
              <div className="flex flex-col gap-y-5">
                {fruits.map(
                  ({ id, name, image, description, price, imageSource }) => (
                    <div className="flex gap-7" key={id}>
                      <img
                        className="w-16 h-16 sm:w-32 sm:h-32 bg-white rounded-lg"
                        src={imageSource === 'local' ? imageUrl(image) : image}
                      />
                      <div className="flex flex-col justify-between px-2 py-1">
                        <div>
                          <div className="font-semibold mb-2">{name}</div>
                          <p className="description opacity-75">
                            {description}
                          </p>
                        </div>
                        <div className="text-price text-lg font-bold mb-1">
                          $ {price}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default FruitList
