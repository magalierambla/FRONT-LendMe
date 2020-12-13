import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute} from '@angular/router';
import { apiHttpSpringBootService } from './../api-spring-boot.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import {UserModel, MessageInterneModel, ResponseConnectionUserModel} from '../interfaces/models';

import { IpServiceService } from './../ip-service.service';


@Component({
  selector: 'app-list-messagerie-user',
  templateUrl: './list-messagerie-user.component.html',
  styleUrls: ['./list-messagerie-user.component.css']
})
export class ListMessagerieUserComponent implements OnInit {

  public infosUser: UserModel = new UserModel();
  public ObjetResponseConnection: ResponseConnectionUserModel = new ResponseConnectionUserModel();

  public polling: any;

  public page = 1;

  public pageSize = 4;

  public collectionSize = 0;

  public listMessagesRecus: Array<MessageInterneModel> = [];

  public listMessagesEnvoyes: Array<MessageInterneModel> = [];

  constructor(private router: Router, private route: ActivatedRoute, private cookie: CookieService,
              private apiService: apiHttpSpringBootService, private ngxService: NgxUiLoaderService,
              private datePipe: DatePipe, public sanitizer: DomSanitizer, private ip: IpServiceService) {

                if (this.cookie.get('infosUser')  &&  this.cookie.get('ObjetResponseConnection')) {

                  this.infosUser = JSON.parse(this.cookie.get('infosUser'));

                  this.ObjetResponseConnection = JSON.parse(this.cookie.get('ObjetResponseConnection'));


                  if (this.infosUser.photoUser === '' || !this.infosUser.photoUser) {

                     if (this.infosUser.sex === 'F') {

                        this.infosUser.photoUser = './assets/img/users/user_f.png';


                     }

                     if (this.infosUser.sex === 'H') {

                        this.infosUser.photoUser = './assets/img/users/user_m.png';


                     }

                  }

                  this.getAllMessagesRecus();

                  this.getAllMessagesEnvoyes();


                  console.log('ProfilUserComponent', this.infosUser);


               }else{

                  this.router.navigate(['/Identification']);

               }

        }

  ngOnInit(): void {  }

  getAllMessagesRecus(){

    this.listMessagesRecus = [];

    this.apiService.getListMessagesRecusByUser(this.ObjetResponseConnection).subscribe((arrayMessagesRecus: Array<MessageInterneModel>) => {


       this.listMessagesRecus = arrayMessagesRecus;

       // tslint:disable-next-line:prefer-for-of
       for (let index = 0; index < this.listMessagesRecus.length; index++) {

         if (this.listMessagesRecus[index].body_message.length > 76){

             // alert(this.listMessagesRecus[index].bodyMessage.length);

             this.listMessagesRecus[index].body_message = this.listMessagesRecus[index].body_message.substr(0, 76) + '...';

         }

         if (this.listMessagesRecus[index]._userExp.photoUser === ''  ||  !this.listMessagesRecus[index]._userExp.photoUser) {

          if (this.listMessagesRecus[index]._userExp.sex === 'F') {

            this.listMessagesRecus[index]._userExp.photoUser = './assets/img/users/user_f.png';
          }

          if (this.listMessagesRecus[index]._userExp.sex === 'H') {

            this.listMessagesRecus[index]._userExp.photoUser = './assets/img/users/user_m.png';

          }

        }


       }

       this.listMessagesRecus = this.listMessagesRecus.sort((c1, c2) => c2.timestamp - c1.timestamp);


    }, (error: any) => { });

  }

  getAllMessagesEnvoyes(){

    this.listMessagesEnvoyes = [];

    // tslint:disable-next-line:max-line-length
    this.apiService.getListMessagesEnvoyesByUser(this.ObjetResponseConnection).subscribe((arrayMessagesRecus: Array<MessageInterneModel>) => {


       this.listMessagesEnvoyes = arrayMessagesRecus;

       // tslint:disable-next-line:prefer-for-of
       for (let index = 0; index < this.listMessagesEnvoyes.length; index++) {

         if (this.listMessagesEnvoyes[index].body_message.length > 76){

             // alert(this.listMessagesRecus[index].bodyMessage.length);

             this.listMessagesEnvoyes[index].body_message = this.listMessagesEnvoyes[index].body_message.substr(0, 76) + '...';

         }

         if (this.listMessagesEnvoyes[index]._userExp.photoUser === ''  ||  !this.listMessagesEnvoyes[index]._userExp.photoUser) {

          if (this.listMessagesEnvoyes[index]._userExp.sex === 'F') {

            this.listMessagesEnvoyes[index]._userExp.photoUser = './assets/img/users/user_f.png';
          }

          if (this.listMessagesEnvoyes[index]._userExp.sex === 'H') {

            this.listMessagesEnvoyes[index]._userExp.photoUser = './assets/img/users/user_m.png';

          }

        }
       }

       this.listMessagesEnvoyes = this.listMessagesEnvoyes.sort((c1, c2) => c2.timestamp - c1.timestamp);


    }, (error: any) => { });

  }

}
