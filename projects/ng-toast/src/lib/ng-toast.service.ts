import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { NgToastConfig } from './';
import { NgToastComponent } from './ng-toast.component';
import { NgToastType } from './ng-toast-type.enum';

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
    const defaultConfig = new NgToastConfig(config);
    defaultConfig.type = NgToastType.Success;
    this.createToast(message, defaultConfig);
  }

  showToastInfo(message: string, config?: NgToastConfig) {
    const defaultConfig = new NgToastConfig(config);
    config.type = NgToastType.Info;
    this.createToast(message, defaultConfig);
  }

  showToastWarning(message: string, config?: NgToastConfig) {
    const defaultConfig = new NgToastConfig(config);
    defaultConfig.type = NgToastType.Warning;
    this.createToast(message, defaultConfig);
  }

  showToastError(message: string, config?: NgToastConfig) {
    const defaultConfig = new NgToastConfig(config);
    defaultConfig.type = NgToastType.Error;
    this.createToast(message, defaultConfig);
  }

  // Dynamic-loading method required you to set up infrastructure
  // before adding the toast to the DOM.
  private createToast(message: string, config?: NgToastConfig) {
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
