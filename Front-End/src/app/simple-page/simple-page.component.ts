import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-simple-page',
  templateUrl: './simple-page.component.html',
  styleUrls: ['./simple-page.component.scss']
})
export class SimplePageComponent implements OnInit {

  public formData = {
    fullName: '',
    contactNumber: '',
    permanentAddress: '',
    correspondAddress: '',
    accountType: '',
    idProof: '',
    idNumber: '',
    depositAmount: ''
  }
  idNumber: string = ''
  valid = {
    fullName: false,
    contactNumber: false,
    permanentAddress: false,
    correspondAddress: false,
    accountType: false,
    idProof: false,
    idNumber: false,
    depositAmount: false
  };
  isFullName = false
  isContactNumber = false
  isPermanentAddress = false
  isCorrespondAddress = false
  isAccountType = false
  isIdProof = false
  isIdNumber = false
  isDepositAmount = false
  enableCreateButton = false;
  position = 'top-right';
  showClose = true;
  timeout = 5000;
  theme = 'default';
  closeOther = false;
  isAccountNumber
  constructor(
    private toastyService: ToastyService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isAccountNumber = sessionStorage.getItem('accountNumber');
    console.log(this.isAccountNumber)
  }

  onKey(event: any, type: string) {
    if (type === 'fullName') {
      this.formData.fullName = event.target.value;
      if (this.formData.fullName) {
        this.isFullName = true
      }
      else {
        this.isFullName = false
      }
    } else if (type === 'contactNumber') {
      this.formData.contactNumber = event.target.value;
      if (this.formData.contactNumber) {
        if (this.formData.contactNumber.length == 10) {
          this.isContactNumber = true
        }
        else {
          this.addToast({ msg: 'contact number not valid', type: 'error' });
          console.log('not valid')
          this.isContactNumber = false
        }
      }
      else {
        this.isContactNumber = false
      }
    } else if (type === 'permanentAddress') {
      this.formData.permanentAddress = event.target.value;
      if (this.formData.permanentAddress) {
        this.isPermanentAddress = true
      }
      else {
        this.isPermanentAddress = false
      }
    } else if (type === 'correspondAddress') {
      this.formData.correspondAddress = event.target.value;
      if (this.formData.correspondAddress) {
        this.isCorrespondAddress = true
      }
      else {
        this.isCorrespondAddress = false
      }
    }
    else if (type === 'accountType') {
      this.formData.accountType = event.target.value;
      if (this.formData.accountType) {
        this.isAccountType = true
      }
      else if (this.formData.accountType == '') {
        this.isAccountType = false
      }
      else {
        this.isAccountType = false
      }
    }
    else if (type === 'idProof') {
      this.formData.idProof = event.target.value;
      if (this.formData.idProof) {
        this.isIdProof = true
        this.idNumber = '';
        console.log(1, event.target.value)
      }
      else if (this.formData.idProof == '') {
        this.isIdProof = false
        this.idNumber = '';
        console.log(2, event.target.value)
      }
      else {
        this.isIdProof = false
        console.log(3, event.target.value)
        this.idNumber = '';
      }
    }
    else if (type === 'idNumber') {
      let aadharPattern = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
      let panPattern = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
      let drivingLicence = /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/;
      this.formData.idNumber = event.target.value;
      if (this.formData.idNumber) {
        if (this.formData.idProof == 'aadhar') {
          if (aadharPattern.test(this.formData.idNumber)) {
            this.isIdNumber = true;
            this.addToast({ msg: 'aadhar number valid', type: 'success' })
          }
          else {
            this.isIdNumber = false
            this.addToast({ msg: 'aadhar number not valid', type: 'error' })
          }
        }
        else if (this.formData.idProof == 'pan') {
          if (panPattern.test(this.formData.idNumber.toUpperCase())) {
            this.isIdNumber = true;
            this.addToast({ msg: 'pan number valid', type: 'success' })
          }
          else {
            this.isIdNumber = false
            this.addToast({ msg: 'pan number not valid', type: 'error' })
          }
        }
        else if (this.formData.idProof == 'driving-licence') {
          if (drivingLicence.test(this.formData.idNumber.toUpperCase())) {
            this.isIdNumber = true;
            this.addToast({ msg: 'driving-licence number valid', type: 'success' })
          }
          else {
            this.isIdNumber = false
            this.addToast({ msg: 'driving-licence number not valid', type: 'error' })
          }
        }
        else if(this.formData.idProof == 'other') {
          if (this.formData.idNumber.length < 4) {
            this.isIdNumber = false;
            this.addToast({ msg: 'eter minimum 4 character', type: 'error' })
          }
          else {
            this.isIdNumber = true
            this.addToast({ msg: 'id number valid', type: 'success' })
          }
        }
      }
      else {
        this.isIdNumber = false
      }
    }
    else if (type === 'depositAmount') {
      this.formData.depositAmount = event.target.value;
      if (this.formData.depositAmount) {
        this.isDepositAmount = true
      }
      else {
        this.isDepositAmount = false
      }
    }
  }
  onCreate() {
    this.userService.createAccount(this.formData).subscribe((res: any) => {
      this.addToast({ msg: 'account has been created successful!', type: 'success' });
      sessionStorage.setItem('accountNumber', res.accountNumber);
      window.location.reload();
    },
      error => {
        this.addToast({ msg: error.error.message, type: 'error' })
      });
  }

  onClear() {
    //this.formData = {
    this.formData.fullName = '',
      this.formData.contactNumber = '',
      this.formData.permanentAddress = '',
      this.formData.correspondAddress = '',
      this.formData.accountType = '',
      this.formData.idProof = '',
      this.formData.idNumber = '',
      this.formData.depositAmount = ''
    //}
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
