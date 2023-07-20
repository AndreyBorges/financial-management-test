import {
  IAxiosResponse,
  ICreateTransactionDTO,
  ICreateTransactionResponseDTO,
  IDeleteOneTransactionsResponseDTO,
  IGetAllTransactionsQueryOptions,
  IGetAllTransactionsResponseDTO,
  IGetOneOrDeleteTransactionsQueryOptions,
  IGetOneTransactionsResponseDTO,
  IUpdadeTransactionDTO,
  IUpdateTransactionResponseDTO
} from '@/interfaces'
import { Api } from '@/services'
import { AxiosError } from 'axios'

const baseUrl = '/transaction'

const getAll = async (
  param: IGetAllTransactionsQueryOptions = {}
): Promise<IAxiosResponse<IGetAllTransactionsResponseDTO>> => {
  try {
    const keys = Object.keys(param)
    const values = Object.values(param)
    const queryString = keys.reduce((acc, key, index) => {
      return `${acc}&${key}=${values[index]}`
    }, '')
    const { data } = await Api.get(`${baseUrl}?${queryString}`)
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

const getOne = async ({
  id
}: IGetOneOrDeleteTransactionsQueryOptions): Promise<
  IAxiosResponse<IGetOneTransactionsResponseDTO>
> => {
  try {
    const { data } = await Api.get(`${baseUrl}/${id}`)
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
}: IUpdadeTransactionDTO): Promise<IAxiosResponse<IUpdateTransactionResponseDTO>> => {
  try {
    const { data: responseData } = await Api.patch(`${baseUrl}/${id}`, data)
    if (responseData.error) throw data
    return {
      data: responseData,
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
  createData: ICreateTransactionDTO
): Promise<IAxiosResponse<ICreateTransactionResponseDTO>> => {
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
}: IGetOneOrDeleteTransactionsQueryOptions): Promise<
  IAxiosResponse<IDeleteOneTransactionsResponseDTO>
> => {
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

export const transactionsService = {
  getAll,
  getOne,
  create,
  remove,
  update
}
