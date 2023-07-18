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
      createCategoryDto.name.toLowerCase(),
    );

    if (categoryAlreadyExists)
      throw new BadRequestException(
        `A categoria [${createCategoryDto.name}] já existe!`,
      );

    const newCategory = this.categoryRepository.create({
      name: createCategoryDto.name.toLowerCase(),
    });

    await this.categoryRepository.save(newCategory);

    return {
      message: 'Categoria cadastrada com sucesso!',
      data: newCategory,
    };
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return { data: categories };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryAlreadyExists = await this.findOneByCategoryName(
      updateCategoryDto.name.toLowerCase(),
    );

    if (categoryAlreadyExists)
      throw new BadRequestException(`A categoria [${id}] não existe!`);

    await this.categoryRepository.update(
      { id },
      { name: updateCategoryDto.name.toLowerCase() },
    );

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
    return foundCategory;
  }

  async countAndUpdateQuantity(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category)
      throw new BadRequestException(`A categoria [${id}] não existe!`);

    await this.categoryRepository.update(
      { id },
      { quantity: category.quantity + 1 },
    );
  }
}
