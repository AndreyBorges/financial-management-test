import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  //Serviço Principais
  async create(createCategoryDto: CreateCategoryDto) {
    const categoryAlreadyExists = await this.findOneByCategoryName(
      createCategoryDto.name,
    );

    if (categoryAlreadyExists)
      throw new BadRequestException(
        `A categoria [${createCategoryDto.name}] já existe!`,
      );

    const newCategory = this.categoryRepository.create(createCategoryDto);

    await this.categoryRepository.save(newCategory);

    return {
      message: 'Categoria cadastrada com sucesso!',
      data: newCategory,
    };
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryAlreadyExists = await this.findOneByCategoryName(
      updateCategoryDto.name,
    );

    if (categoryAlreadyExists)
      throw new BadRequestException(`A categoria [${id}] não existe!`);

    await this.categoryRepository.update({ id }, updateCategoryDto);

    return {
      message: 'Categoria atualizada com sucesso!',
      data: {
        ...categoryAlreadyExists,
        ...updateCategoryDto,
      },
    };
  }

  async remove(id: number) {
    const categoryAlreadyExist = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!categoryAlreadyExist)
      throw new BadRequestException(`A categoria [${id}] não existe!`);
    await this.categoryRepository.delete(id);
    return {
      message: 'Categoria removida com sucesso!',
    };
  }

  // Serviço auxiliar

  async findOneByCategoryName(name: string) {
    const foundCategory = await this.categoryRepository.findOne({
      where: { name },
    });

    console.log({ foundCategory });

    return foundCategory;
  }
}
