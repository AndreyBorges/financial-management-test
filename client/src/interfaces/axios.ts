export interface IAxiosResponse<T> {
  data: T | null
  success: boolean
  error: Error | null 
}
