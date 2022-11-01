import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

export class ToastUtilService {

    position = 'top-right';
    showClose = true;
    timeout = 5000;
    theme = 'default';
    closeOther = false;

    constructor(
        private toastyService: ToastyService
    ) { }

    addToast(options) {
        if (this.closeOther) {
            this.toastyService.clearAll();
        }
        this.position = this.position;
        const toastOptions: ToastOptions = {
            title: options.title,
            msg: options.msg,
            showClose: this.showClose,
            timeout: this.timeout,
            theme: this.theme,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added removed!');
            }
        };

        switch (options.type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }
}