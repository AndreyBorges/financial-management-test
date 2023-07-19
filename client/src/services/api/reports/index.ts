import { AxiosError } from "axios"
import { IAxiosResponse, IReportsResponseDTO } from "@/interfaces"
import { Api } from "@/services"

const baseUrl = '/reports'

const getAll = async (): Promise<IAxiosResponse<IReportsResponseDTO>> => {
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

export const reportsService = {
  getAll
}
