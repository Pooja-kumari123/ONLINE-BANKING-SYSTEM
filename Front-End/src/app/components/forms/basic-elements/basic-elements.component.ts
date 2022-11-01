import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';


@Component({
  selector: 'app-basic-elements',
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})
export class BasicElementsComponent implements OnInit {
  fromAccountNumber = sessionStorage.getItem('accountNumber');
  accountNumber
  isAccountNumber = false;
  verifiedAccountNumber = false;
  position = 'top-right';
  showClose = true;
  timeout = 5000;
  theme = 'default';
  closeOther = false;
  accountDetails
  transferAmount
  enableTransferButton = false
  constructor(
    public userService: UserService,
    private toastyService: ToastyService,
  ) { }

  ngOnInit() {
    this.userService.getAccount()
      .subscribe((data: { user: any }) => {
        this.accountDetails = data;
      });
  }
  onKey(event: any, type: string) {
    if (type === 'accountNumber') {
      this.verifiedAccountNumber = false;
      this.accountNumber = event.target.value;
      if (this.accountNumber) {
        if(this.fromAccountNumber == this.accountNumber){
          this.addToast({ msg: `You can't enter own account number`, type: 'warning' })
          this.isAccountNumber = false;
        }
        else{
        this.isAccountNumber = true;
        }
      }
      else {
        this.isAccountNumber = false;
      }
    }
    else if(type === 'amount'){
      this.transferAmount = event.target.value;
      if(this.accountDetails.amount < this.transferAmount){
        this.enableTransferButton = false;
        this.addToast({ msg: `Enter less than ${this.accountDetails.amount}`, type: 'warning' })
      }
      else if(0 > this.transferAmount){
        this.enableTransferButton = false;
        this.addToast({ msg: `Enter greater than 0`, type: 'warning' })
      }
      else if(this.transferAmount == ''){
        this.enableTransferButton = false;
      }
      else{
        this.enableTransferButton = true;
      }
    }
  }

  accountNumberVerify() {
    this.userService.checkAccount(this.accountNumber)
      .subscribe(data => {
        this.verifiedAccountNumber = true;
        this.addToast({ msg: 'Account Number Valid!', type: 'success' })
      },
      error => {
        this.verifiedAccountNumber = false;
        this.addToast({ msg: 'Account Number Not Valid!', type: 'error' })
        console.log(error.error.message)
      });
  }

  onSend(){
   let formData = {
      amount:this.transferAmount,
      sendToAccountNumber:this.accountNumber
    }
    this.userService.trasnferAmount(formData)
      .subscribe((data: { account: any }) => {
        this.verifiedAccountNumber = false;
        this.addToast({ msg: 'Transaction has been Successful!', type: 'success' })
      });
  }

  addToast(options) {
    if (this.closeOther) {
      this.toastyService.clearAll();
    }
    this.position = this.position;
    const toastOptions: ToastOptions = {
      title: '',
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

