import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttributeTypeService } from './attribute-type.service';
import { CreateAttributeTypeDto } from './dto/create-attribute-type.dto';
import { UpdateAttributeTypeDto } from './dto/update-attribute-type.dto';

@Controller('attribute-type')
export class AttributeTypeController {
  constructor(private readonly attributeTypeService: AttributeTypeService) {}

  @Post()
  create(@Body() createAttributeTypeDto: CreateAttributeTypeDto) {
    return this.attributeTypeService.create(createAttributeTypeDto);
  }

  @Get()
  findAll() {
    return this.attributeTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributeTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttributeTypeDto: UpdateAttributeTypeDto) {
    return this.attributeTypeService.update(+id, updateAttributeTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributeTypeService.remove(+id);
  }
}
