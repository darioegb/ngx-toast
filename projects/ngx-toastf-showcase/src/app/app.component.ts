import { Component } from '@angular/core';
import { NgToastService } from '../../../ngx-toastf/src/lib/ngx-toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: 'testApp';
  constructor(
    private toastService: NgToastService
  ) {}

  showToastSuccess(value): void {
    this.toastService.showToastSuccess(value, {closeButton: true, title: 'test'});
  }

  showToastInfo(value): void {
    this.toastService.showToastInfo(value);
  }

  showToastWarning(value): void {
    this.toastService.showToastWarning(value);
  }

  showToastError(value): void {
    this.toastService.showToastError(value);
  }
}
