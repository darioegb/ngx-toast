import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgxToastPosition, NgxToastService } from 'ngx-toastf'

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly toastService = inject(NgxToastService)

  protected readonly positions = Object.values(NgxToastPosition)
  protected readonly message = signal('Message')
  protected readonly position = signal(NgxToastPosition.TopRight)

  protected showToastSuccess(): void {
    this.toastService.showToastSuccess(this.message(), this.baseConfig())
  }

  protected showToastInfo(): void {
    this.toastService.showToastInfo(this.message(), this.baseConfig())
  }

  protected showToastWarning(): void {
    this.toastService.showToastWarning(this.message(), this.baseConfig())
  }

  protected showToastError(): void {
    this.toastService.showToastError(this.message(), this.baseConfig())
  }

  private baseConfig() {
    return { title: 'Test', position: this.position() }
  }
}
