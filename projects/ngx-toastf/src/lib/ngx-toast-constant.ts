import { NgToastType } from './ngx-toast-type.enum';

export const toastStates = {
    opened: 'opened',
    closed: 'closed'
};

export const flexPositions = {
    center: 'center',
    stretch: 'stretch',
    flexStart: 'flex-start',
    flexEnd: 'flex-end'
};

export const typeConfigClasses = {
    [NgToastType.Success]: 'toast-container-success',
    [NgToastType.Info]: 'toast-container-info',
    [NgToastType.Warning]: 'toast-container-warning',
    [NgToastType.Error]: 'toast-container-error'
};
