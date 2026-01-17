import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { UserService } from './user.service.js';
import {
  CreateProductDto,
  PurchaseProductDto,
  type UserRequest,
} from './user.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class UserController {
  constructor(private service: UserService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Get('products')
  getProducts(@Req() req: UserRequest) {
    return this.service.getProducts(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: UserRequest) {
    return this.service.getProfile(req.user.sub);
  }

  @Get('products/:id')
  getProductById(@Param('id') id: string) {
    return this.service.getProductById(id);
  }

  @Put('products/:id/purchase')
  purchaseProduct(@Param('id') id: string, @Body() dto: PurchaseProductDto) {
    return this.service.purchaseProduct(id, dto);
  }
}
