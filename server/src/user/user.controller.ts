import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { UserService } from './user.service.js';
import { CreateProductDto, type UserRequest } from './user.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller()
export class UserController {
  constructor(private service: UserService) {}

  @Post('product/create')
  @UseInterceptors(FileInterceptor('image'))
  createProduct(
    @Req() req: UserRequest,
    @Body() dto: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // 1MB in bytes
          new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }),
          // Accept jpg, jpeg, png (by mimetype)
          new FileTypeValidator({ fileType: /(jpeg|png)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.service.createProduct(dto, image, req.user.sub);
  }
}
