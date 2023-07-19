import { ICommonResponseDTO } from '.'

export interface ICategory {
  id: string
  name: string
  quantity: number
}

export interface IGetAllCategoryResponseDTO {
  data: ICategory[]
}

export interface IDeleteCategoryQueryOptions {
  id: number
}

export interface ICreateCategoryDTO {
  name: string
}

export interface IStateCategoryDTO extends Partial<ICreateCategoryDTO> {}

export interface IUpdadeCategoryDTO extends Partial<ICreateCategoryDTO> {
  id: number
}

export interface IGetOneCategoryResponseDTO extends ICommonResponseDTO<ICategory> {}

export interface ICreateCategoryResponseDTO extends ICommonResponseDTO<ICategory> {}

export interface IUpdateCategoryResponseDTO extends ICommonResponseDTO<ICategory> {}

export interface IDeleteOneCategoryResponseDTO extends ICommonResponseDTO<null> {}
