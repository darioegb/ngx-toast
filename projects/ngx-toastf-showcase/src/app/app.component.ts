import { Component } from '@angular/core';
import { NgToastService } from '../../../ngx-toastf/src/lib/ngx-toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-toastf-showcase';
  constructor(
    private toastService: NgToastService
  ) { }

  showToastSuccess(value, duration = 3000): void {
    this.toastService.showToastSuccess(value, { closeButton: true, title: 'test', duration });
  }

  showToastInfo(value, duration = 3000): void {
    this.toastService.showToastInfo(value, { closeButton: true, title: 'test', duration });
  }

  showToastWarning(value, duration = 3000): void {
    this.toastService.showToastWarning(value, { closeButton: true, title: 'test', duration });
  }

  showToastError(value, duration = 3000): void {
    this.toastService.showToastError(value, { closeButton: true, title: 'test', duration });
  }
}
