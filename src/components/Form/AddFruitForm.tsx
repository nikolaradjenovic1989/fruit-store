import { FormEvent, useState } from 'react'
import UploadImage from './UploadImage'
import { Fruit, Status, addFruit } from '../../api'
import Button from './Button'
import { formatImageFileName, generateId } from '../../utils'

type AddFruitFormProps = {
  onClose: () => void
}

const AddFruitForm = ({ onClose }: AddFruitFormProps) => {
  const [status, setStatus] = useState<Status>('hot')
  const [country, setCountry] = useState('America')
  const [fruit, setFruit] = useState('')
  const [price, setPrice] = useState<number>(0)
  const [imageUrl, setImageUrl] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [description, setDescription] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // prevent save if data is incomplete, implementing validation
    // would require more time and I am time limited to finish task
    if (fruit && price && description && (image || imageUrl)) {
      const imageString = image ? formatImageFileName(fruit, image) : imageUrl

      const fruitForSave: Fruit = {
        id: generateId(),
        country,
        description,
        image: imageString,
        imageSource: image ? 'local' : 'url',
        name: fruit,
        price,
        status,
      }

      addFruit(fruitForSave)
      onClose()
    }
  }

  return (
    <form
      className="p-5 overflow-y-auto"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <table className="flex flex-col">
        <tbody className="flex flex-col gap-y-6 text-sm">
          <tr className="flex items-center">
            <td className="flex justify-end w-[13%]">
              <label htmlFor="tab" className="mr-2 opacity-70">
                Tab:
              </label>
            </td>
            <td className="w-full">
              <select
                id="tab"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className="bg-btn-secondary-hover hover:bg-btn-secondary p-3 rounded-lg outline-none cursor-pointer border-0 w-full h-12 focus:ring-transparent"
              >
                <option value="hot">Hot</option>
                <option value="new">New</option>
                <option value="recommend">Recommend</option>
              </select>
            </td>
          </tr>

          <tr className="flex items-center">
            <td className="flex justify-end w-[13%]">
              <label htmlFor="country" className="mr-2 opacity-70">
                Country:
              </label>
            </td>
            <td className="w-full">
              <select
                id="country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-btn-secondary-hover hover:bg-btn-secondary p-3 rounded-lg outline-none cursor-pointer border-0 w-full h-12 focus:ring-transparent"
              >
                <option value="America">America</option>
                <option value="England">England</option>
                <option value="Japan">Japan</option>
              </select>
            </td>
          </tr>

          <tr className="flex items-center">
            <td className="flex justify-end w-[13%]">
              <label htmlFor="fruit" className="mr-2 opacity-70">
                Fruit:
              </label>
            </td>
            <td className="w-full">
              <input
                id="fruit"
                type="text"
                name="fruit"
                value={fruit}
                onChange={(e) => setFruit(e.target.value)}
                className="rounded-lg bg-btn-secondary hover:bg-btn-secondary-hover focus:ring-transparent border-0 w-full h-12"
              />
            </td>
          </tr>

          <tr className="flex items-center">
            <td className="flex justify-end w-[13%]">
              <label htmlFor="price" className="mr-2 opacity-70">
                Price:
              </label>
            </td>
            <td className="w-full">
              <input
                id="price"
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="rounded-lg bg-btn-secondary hover:bg-btn-secondary-hover focus:ring-transparent border-0 w-full h-12"
              />
            </td>
          </tr>

          <tr className="flex mt-2">
            <td className="flex justify-end w-[13%]">
              <span className="mr-2 opacity-70">Icon:</span>
            </td>
            <td className="w-full">
              <UploadImage image={image} setImage={setImage} />
            </td>
          </tr>

          <tr className="flex items-center">
            <td className="flex justify-end w-[13%]">
              <label htmlFor="imageUrl" className="mr-2 opacity-70">
                Icon URL:
              </label>
            </td>
            <td className="w-full">
              <input
                id="iconUrl"
                type="text"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="rounded-lg bg-btn-secondary hover:bg-btn-secondary-hover focus:ring-transparent border-0 w-full h-12"
              />
            </td>
          </tr>

          <tr className="flex">
            <td className="flex justify-end w-[12%]">
              <label htmlFor="description" className="mr-2 mt-3 opacity-70">
                Description:
              </label>
            </td>
            <td className="w-full">
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={250}
                className="rounded-lg bg-btn-secondary hover:bg-btn-secondary-hover focus:ring-transparent border-0 w-full"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex items-center justify-end p-6 gap-5">
        <Button
          className="btn-secondary w-32"
          onClick={onClose}
          value="Close"
        />
        <Button type="submit" className="btn-primary w-32" value="Save" />
      </div>
    </form>
  )
}

export default AddFruitForm
