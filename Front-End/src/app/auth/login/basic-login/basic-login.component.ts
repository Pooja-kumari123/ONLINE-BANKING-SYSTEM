import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  data
  position = 'top-right';
  showClose = true;
  timeout = 5000;
  theme = 'default';
  closeOther = false;
  ROLE

  constructor(
    public userService: UserService,
    private toastyService: ToastyService,
    private router: Router
  ) { }

  ngOnInit() {
    if(window.location.pathname == '/auth/admin/login'){
      this.ROLE = 'ADMIN'
    }
    else{
      this.ROLE = 'CUSTOMER'
    }
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  onKey(event: any, type: string) {
    if (type === 'username') {
      this.username = event.target.value;
    } else if (type === 'password') {
      this.password = event.target.value;
    }
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

  onSubmit() {
    this.userService.login(this.username, this.password)
      .subscribe(res => {
      if(res.role == this.ROLE){
        this.router.navigateByUrl('/dashboard');
        this.addToast({ msg: 'Login Successful!', type: 'success' });
        if (res.accessToken)
          sessionStorage.setItem('accessToken', res.accessToken);
        if (res.accountNumber)
          sessionStorage.setItem('accountNumber', res.accountNumber);
        if (res.id)
          sessionStorage.setItem('userId', res.id);
      }
      else{
        this.addToast({ msg: 'Access Denied!', type: 'error' })
      }
      },
        error => {
          this.addToast({ msg: error.error.message, type: 'error' })
        });
  }

}
