import { Component, OnInit } from '@angular/core';
import {Options} from "ng5-slider";
import {ActivatedRoute, Router} from "@angular/router";
import {SignupService} from "../signup.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {
  enterprise_percentage: number = 0;
  userId:string;
  screen:string = "SocialMedia";
  currentScreen:string;
  questionsList:any;
  questionArray:any[]=[];
  options: Options = {
    floor: 0,
    ceil: 100,
  };
  constructor(private router:Router, private route:ActivatedRoute, private service:SignupService, private http:HttpClient) {}

//Form Validations
  technologyDetails: FormGroup = new FormGroup({
    it_devops: new FormControl(''),
    continuous_integration: new FormControl(''),
    chatBots_chatOps: new FormControl(''),
    social_handles: new FormControl(''),
    enterprise_percentage:new FormControl('', Validators.required),
  })

  ngOnInit() {
    //For getting Id from CustomerExperience Page through URL
    this.route.params.subscribe((result) =>{
      this.userId=result.userId;
      this.currentScreen=result.screen;
      console.log('hemaveni',this.screen);
    })
    this.socialGetQuestions();
  }
  socialGetQuestions() {
    return this.http.get<any>(environment.apiEndPointUrl +  '/api/questions/quest/' + this.userId + '/' + this.currentScreen).subscribe((questions) => {
      this.questionsList = questions
      for(var i=0; i<this.questionsList.length; i++)
        this.questionArray.push(JSON.stringify(this.questionsList[i].question).replace (/(^")|("$)/g, ''));
      console.log('ghhhh', this.questionArray);
    })

  }

  submit() { //Check the value of Linkedin_url and percentage value entered or not
    this.service.technologyDetails({
      it_devops:this.technologyDetails.value.it_devops?"Yes":"No",
      continuous_integration:this.technologyDetails.value.continuous_integration?"Yes":"No",
      chatBots_chatOps:this.technologyDetails.value.chatBots_chatOps?"Yes":"No",
      social_handles:this.technologyDetails.value.social_handles?"Yes":"No",
      enterprise_percentage: this.technologyDetails.value.enterprise_percentage
    }, this.userId,this.screen).subscribe((data) => {
      return data;
    });
    this.router.navigateByUrl(`/details/${this.userId}/${this.screen}`);
  }
}
