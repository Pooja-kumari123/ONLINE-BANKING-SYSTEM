import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { UserService } from '../.../../services/user/user.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  user: any
  accounts : any
  transactions: any
  creditTotalAmount = 0
  debitTotalAmount = 0
  totalCreditAmount = 0
  totalDebitAmount = 0
  displayStyle = "none";
  customerDetails: any;
  // Pagination parameters.
  p1 = 1;
  count1 = 5;
  p2 = 1;
  count2 = 5;
  customerAccounts
  customerTransactions
  customerTotalCreditAmount = 0
  customerTotalDebitAmount = 0
  // comboChartData =  {
  //   chartType: 'ComboChart',
  //   dataTable: [
  //     ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
  //     ['2004/05', 165, 938, 522, 998, 450, 614.6],
  //     ['2005/06', 135, 1120, 599, 1268, 288, 782],
  //     ['2006/07', 157, 1167, 587, 807, 397, 323],
  //     ['2007/08', 139, 1110, 615, 968, 215, 509.4],
  //     ['2008/09', 136, 691, 629, 1026, 366, 269.6]
  //   ],
  //   options: {
  //     height: 320,
  //     title: 'Monthly Coffee Production by Country',
  //     vAxis: { title: 'Cups' },
  //     hAxis: { title: 'Month' },
  //     seriesType: 'bars',
  //     bar: {groupWidth: '90%'},
  //     series: { 5: { type: 'line' } },
  //     colors: ['#e74c3c', '#2ecc71', '#5faee3', '#0073aa', '#f1c40f', '#e74c3c']
  //   },
  // };
  /*Polar chart*/
  type3 = 'polarArea';
  // data3 = {
  //   datasets: [{
  //     data: [
  //       11,
  //       16,
  //       7,
  //       14
  //     ],
  //     backgroundColor: [
  //       '#7E81CB',
  //       '#1ABC9C',
  //       '#B8EDF0',
  //       '#01C0C8'
  //     ],
  //     hoverBackgroundColor: [
  //       '#a1a4ec',
  //       '#2adab7',
  //       '#a7e7ea',
  //       '#10e6ef'
  //     ],
  //     label: 'My dataset' // for legend
  //   }],
  //   legend: {
  //     display: false,
  //   },
  //   labels: [
  //     'Blue',
  //     'Green',
  //     'Light Blue',
  //     'Sea Green'
  //   ]
  // };
  // options3 = {
  //   elements: {
  //     arc: {
  //       borderColor: ''
  //     },
  //     labels: {
  //       display: false,
  //     }
  //   }
  // };
  constructor(
    public userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.getUser()
      .subscribe((data: { user: any }) => {
        this.user = data;
      //});
if(this.user.role == 'ADMIN'){
      this.userService.getAllAccount()
      .subscribe((data: { user: any }) => {
        this.accounts = data;
      });

      this.userService.getAllTransaction()
      .subscribe((data: { user: any }) => {
        this.transactions = data;
        this.transactions.forEach(element => {
          if(element.credit){
            this.totalCreditAmount += element.credit;
          }
          else if(element.debit){
            this.totalDebitAmount += element.debit;
          }
          
        });
      });
    }
    else{
      this.userService.getAccount()
      .subscribe((data: { user: any }) => {
        this.customerAccounts = data;
      });
      this.userService.getTransaction()
      .subscribe((data: { user: any }) => {
        this.customerTransactions = data;
        this.customerTransactions.forEach(element => {
          if(element.credit){
            this.customerTotalCreditAmount += element.credit;
          }
          else if(element.debit){
            this.customerTotalDebitAmount += element.debit;
          }
          
        });
      });
    }
  });
    
    // setTimeout( () => {
    //   /* visitors pie chart*/
    //   $('.visitor-chart').sparkline([1, 2], {
    //     type: 'pie',
    //     width: '100px',
    //     height: '65px',
    //     sliceColors: ['#ccc', '#0073aa'],
    //     tooltipClassname: 'chart-sparkline'
    //   });
    //   /* visitor total sale line chart */
    //   $('.sale-chart').sparkline([0, 6, 3, 10, 8, 3, 6, 15, 3, 14, 2, 9, 12, 0], {
    //     type: 'line',
    //     width: '100%',
    //     height: '65px',
    //     tooltipClassname: 'chart-sparkline',
    //     chartRangeMax: '50',
    //     lineColor: '#ccc',
    //     fillColor: '#ccc'
    //   });
    //   /* visitor total revenue chart */
    //   $('.resource-barchart').sparkline([5, 6, 2, 4, 9, 8, 3, 6, 4, 2], {
    //     type: 'bar',
    //     barWidth: '8px',
    //     height: '50px',
    //     barColor: '#239a55',
    //     tooltipClassname: 'abc'
    //   });

    //   /*custom line chart*/
    //   $('.customchart').sparkline([15, 30, 27, 35, 50, 71, 60], {
    //     type: 'line',
    //     width: 300,
    //     height: 300,
    //     tooltipClassname: 'chart-sparkline',
    //     chartRangeMax: '50',
    //     lineColor: '#0073aa',
    //     fillColor: 'rgba(0, 115, 170, 0.5)'
    //   });

    //   $('.customchart').sparkline([0, 25, 10, 7, 25, 35, 30], {
    //     type: 'line',
    //     width: 300,
    //     height: 300,
    //     composite: '!0',
    //     tooltipClassname: 'chart-sparkline',
    //     chartRangeMax: '40',
    //     lineColor: '#239a55',
    //     fillColor: 'rgba(35, 154, 85, .5)'
    //   });
    // }, 1);
  }

  getOneCustomer(account){
    console.log(account)
  }

  openPopup(account) {
    this.customerDetails = account;
    this.displayStyle = "block";
  }
  closePopup() {
    this.customerDetails = null;
    this.displayStyle = "none";
  }

  openPopupCustomerAccounts(){
    this.customerDetails = this.customerAccounts;
    this.displayStyle = "block";
  }
}
