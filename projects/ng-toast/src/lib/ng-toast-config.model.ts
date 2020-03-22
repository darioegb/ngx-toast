import { NgToastPosition } from './ng-toast-position.enum';
import { NgToastType } from './ng-toast-type.enum';

export class NgToastConfig {
    title?: string;
    position?: NgToastPosition;
    duration?: number;
    type?: NgToastType;
    closeButton?: boolean;
    tapDismiss?: boolean;
    autoClose?: boolean;

    constructor(options: {
        title?: string,
        position?: NgToastPosition,
        duration?: number,
        type?: NgToastType,
        closeButton?: boolean,
        tapDismiss?: boolean,
        autoClose?: boolean,
    } = {}) {
        this.title = options.title || null;
        this.position = options.position !== undefined ? options.position : NgToastPosition.TopRight;
        this.duration = options.duration !== undefined ? options.duration : 3000;
        this.type = options.type;
        this.closeButton = options.closeButton || false;
        this.tapDismiss = options.tapDismiss || false;
        this.autoClose = options.autoClose || false;
    }
}
