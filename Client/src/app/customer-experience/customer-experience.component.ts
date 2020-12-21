import {Component, OnInit, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SignupService} from '../signup.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-customer-experience',
  templateUrl: './customer-experience.component.html',
  styleUrls: ['./customer-experience.component.css']
})
export class CustomerExperienceComponent implements OnInit {

  userId: string;
  screen: string = "Technology";
  questions: any;
  currentScreen: string;
  questionArray: any[] = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private service: SignupService) {}

  //Form Validations
  sample: FormGroup = new FormGroup({
    industry: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/),Validators.maxLength(30),Validators.minLength(2)]),
    organizational_strategy: new FormControl(''),
    customer_experience: new FormControl(''),
    realtime_communication: new FormControl(''),
    information_model: new FormControl(''),
    automated_analytics: new FormControl(''),
  })

  ngOnInit(){   //For getting Id from SignUp Page through URL
    this.route.params.subscribe((data) => {
      this.userId = data.userId;
      this.currentScreen = data.screen;
    })
    this.customerGetQuestions();
  }

  keyDownFunction(event) {
    // if(this.sample.controls['industry'].valid)
    // return true;
    // else
    //   return  false;
    return false;
  }

  customerGetQuestions() {
    return this.http.get<any>(environment.apiEndPointUrl + '/api/questions/quest/' + this.userId + '/' + this.currentScreen).subscribe((questions) => {
      this.questions = questions
      for (var i = 0; i < this.questions.length; i++)
        this.questionArray.push(JSON.stringify(this.questions[i].question).replace(/(^")|("$)/g, ''));
    })
  }

  Submit() {  //To check industry value is entered or not
    if (this.sample.value.industry) {
      this.service.customerExperienceDetails({
          industry: this.sample.value.industry,
          organizational_strategy:this.sample.value.organizational_strategy ? "Yes" : "No",
          customer_experience: this.sample.value.customer_experience ? "Yes" : "No",
          realtime_communication: this.sample.value.realtime_communication ? "Yes" : "No",
          information_model: this.sample.value.information_model ? "Yes" : "No",
        automated_analytics: this.sample.value.automated_analytics ? "Yes" : "No",
      }, this.userId, this.screen).subscribe((data) => {
          return data;
        });
        this.router.navigateByUrl(`/technology/${this.userId}/${this.screen}`);
      }else {
      console.log('error')
    }
  }

}
