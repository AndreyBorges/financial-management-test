import { IAxiosResponse, ICreateCategoryDTO, ICreateCategoryResponseDTO, IDeleteCategoryQueryOptions, IDeleteOneCategoryResponseDTO, IGetAllCategoryResponseDTO, IUpdadeCategoryDTO, IUpdateCategoryResponseDTO } from '@/interfaces'
import { Api } from '@/services'
import { AxiosError } from 'axios'

const baseUrl = '/category'

const getAll = async (): Promise<IAxiosResponse<IGetAllCategoryResponseDTO>> => {
  try {
    const { data } = await Api.get(baseUrl)
    if (data.error) throw data
    return {
      data,
      success: true,
      error: null
    }
  } catch (error) {
    const customError = error as AxiosError & { response: { data: { message: string } } }
    console.error(error)
    return {
      error: new Error(customError.response?.data?.message),
      success: false,
      data: null
    }
  }
}

const update = async ({
  id,
  ...data
}: IUpdadeCategoryDTO): Promise<IAxiosResponse<IUpdateCategoryResponseDTO>> => {
  try {
    const { data: responseData } = await Api.patch(`${baseUrl}/${id}`, data)
    if (responseData.error) throw data
    return {
      ...responseData,
      success: true,
      error: null
    }
  } catch (error) {
    const customError = error as AxiosError & { response: { data: { message: string } } }
    console.error(error)
    return {
      error: new Error(customError.response?.data?.message),
      success: false,
      data: null
    }
  }
}

const create = async (
  createData: ICreateCategoryDTO
): Promise<IAxiosResponse<ICreateCategoryResponseDTO>> => {
  try {
    const { data } = await Api.post(baseUrl, createData)
    if (data.error) throw data

    return {
      data,
      success: true,
      error: null
    }
  } catch (error) {
    const customError = error as AxiosError & { response: { data: { message: string } } }
    console.error(error)
    return {
      error: new Error(customError.response?.data?.message),
      success: false,
      data: null
    }
  }
}

const remove = async ({
  id
}: IDeleteCategoryQueryOptions): Promise<IAxiosResponse<IDeleteOneCategoryResponseDTO>> => {
  try {
    const { data } = await Api.delete(`${baseUrl}/${id}`)
    if (data.error) throw data
    return {
      data,
      success: true,
      error: null
    }
  } catch (error) {
    const customError = error as AxiosError & { response: { data: { message: string } } }
    console.error(error)
    return {
      error: new Error(customError.response?.data?.message),
      success: false,
      data: null
    }
  }
}

export const categoriesService = {
  getAll,
  create,
  remove,
  update
}
