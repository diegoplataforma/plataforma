import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { LottieAnimationsModule } from './lottie-animations/lottie-animations.module';




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
  ]
})
export class SharedModule { }
