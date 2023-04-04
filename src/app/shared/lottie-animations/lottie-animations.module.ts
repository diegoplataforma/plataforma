import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';


import { EmailComponent } from './components/email/email.component';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
    return player;
}

@NgModule({
  declarations: [
    EmailComponent
  ],
  imports: [
    CommonModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [
    EmailComponent
  ]
})
export class LottieAnimationsModule { }
