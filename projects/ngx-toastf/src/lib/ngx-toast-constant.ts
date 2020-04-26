import { NgToastType } from './ngx-toast-type.enum';

export const toastStates = {
    opened: 'opened',
    closed: 'closed'
};

export const positions = {
    none: 0,
    halfSide: '50%'
};

export const typeConfigClasses = {
    [NgToastType.Success]: 'toast-container-success',
    [NgToastType.Info]: 'toast-container-info',
    [NgToastType.Warning]: 'toast-container-warning',
    [NgToastType.Error]: 'toast-container-error'
};
