// service: thao tác với model, su li logic
import { categoryModel } from '~/models/categoryModel'
import { imageService } from './imageService'
import { generateUniqueSlug } from '~/utils/fommaters'


const create = async (reqBody) =>
{
  try {
    const slug = await generateUniqueSlug(reqBody.name, 'categories')

    reqBody.slug = slug
    const newCategory = categoryModel.create(reqBody)

    return newCategory

  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, reqBody) => {
  try {
    const updatedCategory = categoryModel.update(id, reqBody)

    return updatedCategory
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) =>
{
  try {
    const category = await categoryModel.findOneById(id)

    return category
  } catch (error) {
    throw new Error(error)
  }
}

const findOneBySlug = async (slug) => {
  try {
    const category = await categoryModel.findOneBySlug(slug)

    return category
  } catch (error) {
    throw new Error(error)
  }
}

const findAll = async (host) => {
  try {
    const categories = await categoryModel.findAll()
    for (let category of categories)
    {
      if (category && category.image && category.image[0] && category.image[0].url) {
        category.image[0].url = host + '/' + category.image[0].url
      }
    }
    return categories
  } catch (error) {
    throw new Error(error)
  }
}


const remove = async (idOrSlug) => {
  try {
    const categoryId = await categoryModel.remove(idOrSlug)
    await imageService.remove(categoryId)
  } catch (error) {
    throw new Error(error)
  }
}


export const categoryService = {
  create,
  findOneById,
  findAll,
  update,
  findOneBySlug,
  remove
}