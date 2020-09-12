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

  showToastSuccess(value): void {
    this.toastService.showToastSuccess(value, { closeButton: true, title: 'test' });
  }

  showToastInfo(value): void {
    this.toastService.showToastInfo(value, { closeButton: true, title: 'test' });
  }

  showToastWarning(value): void {
    this.toastService.showToastWarning(value, { closeButton: true, title: 'test' });
  }

  showToastError(value): void {
    this.toastService.showToastError(value, { closeButton: true, title: 'test' });
  }
}
