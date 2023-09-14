import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/database/prismaService';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateBookDto) {
    const verifyBookExit = await this.prisma.book.findFirst({
      where:{
        bar_code:data.bar_code
      }
      })
      if(verifyBookExit){
        throw new Error('Book already exits');
      }
    const result = await this.prisma.book.create({
      data
    })

    return result;
  }

  async findAll() {
    return await this.prisma.book.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
