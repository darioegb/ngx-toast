import { Component } from '@angular/core';
import { NgToastService } from '../../../ng-toast/src/lib/ng-toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private toastService: NgToastService
  ) {}

  showToastSuccess(value): void {
    this.toastService.showToastSuccess(value, {autoClose: true});
  }

  showToastInfo(value): void {
    this.toastService.showToastInfo(value, {autoClose: true});
  }

  showToastWarning(value): void {
    this.toastService.showToastWarning(value, {autoClose: true});
  }

  showToastError(value): void {
    this.toastService.showToastError(value, {autoClose: true});
  }
}
