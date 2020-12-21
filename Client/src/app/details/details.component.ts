import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Options} from 'ng5-slider';
import {Router, ActivatedRoute} from "@angular/router";
import {SignupService} from '../signup.service';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  enterprise_percentage: number = 0;
  userId:string;
  showMsg = false;
  userDetails:any;
  customerDetails:any;
  technologyDetails:any;
  options: Options = {
    floor: 0,
    ceil: 100,
  };
  constructor(private router:Router, private route:ActivatedRoute, private service:SignupService, private http:HttpClient) {}
//Form Validations
  sampleDetails: FormGroup = new FormGroup({
    linkedin: new FormControl(''),
    facebook: new FormControl(''),
    twitter: new FormControl(''),
    appStore: new FormControl('', Validators.pattern(/^[a-zA-Z\s]*$/)),
    playStore: new FormControl('', Validators.pattern(/^[a-zA-Z\s]*$/)),
  })

  ngOnInit() {
    //For getting Id from CustomerExperience Page through URL
    this.route.params.subscribe((result) =>{
      this.userId=result.userId;
    })
  }

  submitVal() { //Check the value of Linkedin_url and percentage value entered or not
    this.service.socialMediaDetails({
        linkedin_url:this.sampleDetails.value.linkedin?this.sampleDetails.value.linkedin:"null",
        facebook_url:this.sampleDetails.value.facebook?this.sampleDetails.value.facebook:"null",
        twitter_url:this.sampleDetails.value.twitter?this.sampleDetails.value.twitter:"null",
        appstore_name:this.sampleDetails.value.appStore?this.sampleDetails.value.appStore:"null",
        playstore_name:this.sampleDetails.value.playStore?this.sampleDetails.value.playStore:"null",
    }, this.userId).subscribe((data) => {
        this.userDetails= data.UserDetails;
        this.customerDetails = data.CustomerDetails;
        this.technologyDetails = data.TechnologyDetails
        console.log('data', data);
        return data;
      });
    this.showMsg = true;
  }
}
