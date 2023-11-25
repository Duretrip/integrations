import { Module } from '@nestjs/common';
import { SabreService } from './sabre.service';
  
@Module({
    providers: [SabreService],
    exports: [SabreService]
})
export class SabreModule { }
