import { imageModel } from '~/models/imageModel'
import { env } from '~/config/environment'
//(id, image) => create new image
const create = async (productId, image, host) =>
{
  try {
    image = image.path.replace('uploads\\', 'uploads/')
    let fileName = image.split('\\')
    fileName = fileName[fileName.length - 1]
    const imageObj =
      {
        url: fileName,
        title : image.filename,
        product_id: productId
      }

    const newImage = await imageModel.createNew(imageObj)

    return newImage

  } catch (error) {
    throw new Error(error)
  }
}
//(id, images) => create new images
const createMany = async (productId, files, name) =>
{
  try {
    const images = files.map(file => file.path)
    for ( let image of images) {
      image = image.replace('uploads\\', 'uploads/')
      let fileName = image.split('\\')
      fileName = fileName[fileName.length - 1]

      const imageObj =
        {
          url: fileName,
          title : name,
          product_id: productId
        }

      await imageModel.createNew(imageObj)
    }

  } catch (error) {
    throw new Error(error)
  }
}

//(id, image) => update image
const update = async (id, image) => {
  try {
    const updatedImage = imageModel.update(id, image)

    return updatedImage
  } catch (error) {
    throw new Error(error)
  }
}
//(id) => find image by id
const findOneById = async (id) =>
{
  try {
    const image = await imageModel.findOneById(id)

    return image
  } catch (error) {
    throw new Error(error)
  }
}
//() => find all image
const findAll = async () => {
  try {
    const images = await imageModel.findAll()
    return images
  } catch (error) {
    throw new Error(error)
  }
}

const removeMany = async (idOrUrls) => {
  try {
    for (let idOrUrl of idOrUrls) {
      if (idOrUrl.includes('http')) {
        await imageModel.removeByUrl(idOrUrl)
      } else {
        //xóa nhiều thông qua id sản phẩm
        const image = await imageModel.findOneByProductId(idOrUrl)
        await imageModel.removeId(image._id)
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

const remove = async (idOrUrl) => {
  try {
    if (idOrUrl.includes('http')) {
      await imageModel.removeByUrl(idOrUrl)
    } else {
      const image = await imageModel.findOneByProductId(idOrUrl)
      await imageModel.removeById(image._id)
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const imageService = {
  create,
  createMany,
  findOneById,
  findAll,
  update,
  removeMany,
  remove
}