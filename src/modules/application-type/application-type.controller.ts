import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApplicationTypeService } from './application-type.service';
import { CreateApplicationTypeDto } from './dto/create-application-type.dto';
import { UpdateApplicationTypeDto } from './dto/update-application-type.dto';

@Controller('application-type')
export class ApplicationTypeController {
  constructor(private readonly applicationTypeService: ApplicationTypeService) {}

  @Post()
  create(@Body() createApplicationTypeDto: CreateApplicationTypeDto) {
    return this.applicationTypeService.create(createApplicationTypeDto);
  }

  @Get()
  findAll() {
    return this.applicationTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationTypeDto: UpdateApplicationTypeDto) {
    return this.applicationTypeService.update(+id, updateApplicationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationTypeService.remove(+id);
  }
}
