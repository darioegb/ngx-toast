import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { NgToastComponent } from './ngx-toast.component';
import { NgToastType } from './ngx-toast-type.enum';
import { NgToastConfig } from './ngx-toast-config.model';

@Injectable({
  providedIn: 'root'
})
export class NgToastService {

  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  showToastSuccess(message: string, config?: NgToastConfig) {
    this.createToast(message, this.createDefaultConfig(NgToastType.Success, config));
  }

  showToastInfo(message: string, config?: NgToastConfig) {
    this.createToast(message, this.createDefaultConfig(NgToastType.Info, config));
  }

  showToastWarning(message: string, config?: NgToastConfig) {
    this.createToast(message, this.createDefaultConfig(NgToastType.Warning, config));
  }

  showToastError(message: string, config?: NgToastConfig) {
    this.createToast(message, this.createDefaultConfig(NgToastType.Error, config));
  }

  private createDefaultConfig(toastType: NgToastType,  config?: NgToastConfig): NgToastConfig {
    const defaultConfig = new NgToastConfig(config);
    defaultConfig.type = toastType;
    return defaultConfig;
  }

  // Dynamic-loading method required you to set up infrastructure
  // before adding the toast to the DOM.
  private createToast(message: string, config?: NgToastConfig) {
    // Get reference if exist
    const refExist = document.querySelector('toast-component');
    // Prevent duplicated
    if (refExist) {
      return;
    }
    // Create element
    const toast = document.createElement('toast-component');
    // Create the component and wire it up with the element
    const factory = this.componentFactoryResolver.resolveComponentFactory(NgToastComponent);
    const toastComponentRef = factory.create(this.injector, [], toast);
    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(toastComponentRef.hostView);
    // Listen to the close event
    toastComponentRef.instance.closed.subscribe(() => {
      document.body.removeChild(toast);
      this.applicationRef.detachView(toastComponentRef.hostView);
    });
    // Set the message
    toastComponentRef.instance.messageValue = message;
    // Set title if exist
    if (config.title) {
      toastComponentRef.instance.titleValue = config.title;
    }
    // Set config
    toastComponentRef.instance.config = config;
    // Add to the DOM
    document.body.appendChild(toast);
  }
}
