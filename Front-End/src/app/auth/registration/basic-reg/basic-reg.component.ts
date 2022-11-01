import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
@Component({
  selector: 'app-basic-reg',
  templateUrl: './basic-reg.component.html',
  styleUrls: ['./basic-reg.component.scss']
})
export class BasicRegComponent implements OnInit {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  data
  position = 'top-right';
  showClose = true;
  timeout = 5000;
  theme = 'default';
  closeOther = false;
  ROLE
  valid = {
    username: true,
    password: true,
    email: true,
  };

  constructor(
    public userService: UserService,
    private toastyService: ToastyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.clear()
    if (window.location.pathname == '/auth/admin/login') {
      this.ROLE = 'ADMIN'
    }
    else {
      this.ROLE = 'CUSTOMER'
    }
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  clear() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  validate(type: string): void {
    const usernamePattern = /^[\w-.]*$/;
    const emailPattern = /\S+@\S+\.\S+/;

    if (type === 'username') {
      if (this.username.length < 5) {
        this.valid.username = false;
        this.addToast({ msg: 'enter minimum 5 character username', type: 'error' })
      }
      else {
        this.valid.username = true;
        this.addToast({ msg: 'username valid', type: 'success' })
      }
    } else if (type === 'email') {
      if (emailPattern.test(this.email)) {
        this.valid.email = true;
        this.addToast({ msg: 'eamil valid', type: 'success' })
      }
      else {
        this.valid.email = false;
        this.addToast({ msg: 'email not valid', type: 'error' })
      }
    }
    else if (type === 'confirmPassword') {
      console.log(1, type)
      if (this.password !== this.confirmPassword) {
        this.valid.password = false;
        this.addToast({ msg: 'passwords are different', type: 'error' })
      } else {
        this.valid.password = true;
        this.addToast({ msg: 'passwords are match', type: 'success' })
      }
    }
    else if (type === 'password') {
      console.log(2, type)
      if (this.password !== this.confirmPassword) {
        this.valid.password = false;
        this.addToast({ msg: 'passwords are different', type: 'error' })
      } else {
        this.valid.password = true;
        this.addToast({ msg: 'passwords are match', type: 'success' })
      }
    }
  }

  onKey(event: any, type: string) {
    if (type === 'username') {
      this.username = event.target.value;
    }
    else if (type === 'email') {
      this.email = event.target.value;
    }
    else if (type === 'password') {
      this.password = event.target.value;
    }
    else if (type === 'confirmPassword') {
      this.confirmPassword = event.target.value;
    }
    this.validate(type);
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

  onRegister(): void {
    console.log(this.username, this.email, this.password)
    if (this.valid.username && this.valid.email && this.valid.password) {
      this.userService
        .register(this.username, this.email, this.password)
        .subscribe((result: any) => {
          if (this.ROLE == 'ADMIN') {
            this.router.navigateByUrl('/auth/admin/login');
          }
          else {
            this.router.navigateByUrl('/auth/customer/login');
          }
          this.addToast({ msg: result.message, type: 'success' })
        },
          error => {
            this.addToast({ msg: error.error.message, type: 'error' })
            console.log(error.error.message)
          });
    }
    else {
      this.addToast({ msg: 'please enter fields', type: 'error' })
    }
  }

}
