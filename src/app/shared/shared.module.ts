import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { LottieAnimationsModule } from './lottie-animations/lottie-animations.module';

import { LoginRepository } from './domain/repositories/login-repository';
import { LoginWebRepository } from './domain/repositories/login-web-repository';
@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    LottieAnimationsModule
  ],
  exports: [
    PrimeNgModule,
    LottieAnimationsModule
  ],
  providers: [
    {
      provide: LoginRepository,
      useClass: LoginWebRepository
    }
  ]
})
export class SharedModule { }
