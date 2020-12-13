import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { apiHttpSpringBootService } from './../api-spring-boot.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { UserModel, MessageInterneModel, ResponseConnectionUserModel } from '../interfaces/models';

import { IpServiceService } from './../ip-service.service';

@Component({
  selector: 'app-show-messagerie-user',
  templateUrl: './show-messagerie-user.component.html',
  styleUrls: ['./show-messagerie-user.component.css']
})
export class ShowMessagerieUserComponent implements OnInit {

  public infosUser: UserModel = new UserModel();

  public ObjetResponseConnection: ResponseConnectionUserModel = new ResponseConnectionUserModel();

  public objectMessage: MessageInterneModel = new MessageInterneModel();

  public typeMessage: any;

  constructor(private router: Router, private route: ActivatedRoute, private cookie: CookieService,
              private apiService: apiHttpSpringBootService, private ngxService: NgxUiLoaderService,
              private datePipe: DatePipe, public sanitizer: DomSanitizer, private ip: IpServiceService) {

   if (this.cookie.get('infosUser')  &&  this.cookie.get('ObjetResponseConnection')) {

      this.ObjetResponseConnection = JSON.parse(this.cookie.get('ObjetResponseConnection'));

      this.infosUser = JSON.parse(this.cookie.get('infosUser'));


      if (this.infosUser.photoUser === '' || !this.infosUser.photoUser) {

        if (this.infosUser.sex === 'F') {

          this.infosUser.photoUser = './assets/img/users/user_f.png';


        }

        if (this.infosUser.sex === 'H') {

          this.infosUser.photoUser = './assets/img/users/user_m.png';


        }

      }


      console.log('ProfilUserComponent', this.infosUser);

      this.route.params.subscribe(params => {

        // alert(params.token_message);

        // alert(params.type_message);

          this.typeMessage = params.type_message;


          this.getInfosMessage(params.token_message);


     });




    } else {

      this.router.navigate(['/Identification']);

    }

  }

  ngOnInit(): void {  }

  getInfosMessage(tokenMessage){


    // tslint:disable-next-line:max-line-length
    this.apiService.getDataMessageInterne(this.ObjetResponseConnection, tokenMessage).subscribe((dataMessage: MessageInterneModel) => {

       this.objectMessage = dataMessage;

       console.log(this.objectMessage.dateConsultation);

    }, (error: any) => {


    });


  }

}
