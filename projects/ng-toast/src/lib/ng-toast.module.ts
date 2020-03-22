import { NgModule } from '@angular/core';
import { NgToastComponent } from './ng-toast.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgToastComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [NgToastComponent],
  exports: [NgToastComponent]
})
export class NgToastModule { }
