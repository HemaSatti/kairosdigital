import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { SignupService } from '../signup.service';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  device: string = '';
  greet: string;
  userId: any;
  screen: any = "Company";
  zoom: number;
  cityName: string;
  ipaddress:string = '';
  constructor(private formBuilder: FormBuilder, private router: Router, private service: SignupService, private http: HttpClient, private ref: ChangeDetectorRef) {

    //To check device type(Mobile,Tablet,Desktop)
    var isMobile = /iPhone|Android/i.test(navigator.userAgent);
    var isTab = /iPad|iPod|Tablet/i.test(navigator.userAgent);

    if (isMobile)
      this.device = 'Mobile'
    // else if (isTab)
    //   this.device = 'Tablet'
    // else
    //   this.device = 'System'

    //For geeting greetings based on time.
    var hrs = new Date().getHours();
    if (hrs < 12)
      this.greet = 'Good Morning';
    else if (hrs >= 12 && hrs < 16)
      this.greet = 'Good Afternoon';
    else if (hrs >= 16 && hrs <= 24)
      this.greet = 'Good Evening';

  }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/),Validators.minLength(3),Validators.maxLength(50)]),
    email: new FormControl('',[Validators.required, Validators.email, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(?!hotmail|gmail|yahoo)(?!HOTMAIL|GMAIL|YAHOO)(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)]),
    // designation: new FormControl('',[Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z.\s_-]+$/)]),
    // company: new FormControl('',[Validators.required, Validators.pattern(/^[0-9A-Za-z'-.]+(?:\s[0-9A-Za-z. /s'-]+)*$/)]),
    designation: new FormControl(''),
    company: new FormControl(''),
  })
  ngOnInit() {

    this.service.getIpAddress().subscribe(res => {
      this.ipaddress = res['ip'];
     console.log(res);

     console.log('hema ip address', this.ipaddress);

    });
  }

  onSubmit() {  //Submit function
    if (this.registerForm.value.email && this.registerForm.value.name){
      this.service.signUpUserDetails(
        {
          email: this.registerForm.value.email,
          name: this.registerForm.value.name ? this.registerForm.value.name : 'null',
          company_name: this.registerForm.value.company ? this.registerForm.value.company : 'null',
          designation: this.registerForm.value.designation ? this.registerForm.value.designation : 'null',
          system_ipadrress: this.ipaddress ? this.ipaddress : "An error occurred",
          screen: this.screen
        }).subscribe((data) => {
        var userVal = data.userId
        this.userId = data.UserId;
        if (this.userId) {
          this.router.navigateByUrl(`/customer/${this.userId}/${this.screen}`)
        } else
          this.router.navigateByUrl(`/customer/${userVal}/${this.screen}`)
      });
  }else
    console.log('error');
  }

}
