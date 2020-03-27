import { NgModule } from '@angular/core';
import { NgToastComponent } from './ngx-toast.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgToastComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [NgToastComponent]
})
export class NgToastModule { }
