import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { apiHttpSpringBootService } from './../api-spring-boot.service';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Title } from '@angular/platform-browser';
import {
  ConnectionUserModel,
  ResponseConnectionUserModel,
  UserModel,
} from '../interfaces/models';

declare var window: any;

@Component({
  selector: 'app-identification-admin',
  templateUrl: './identification-admin.component.html',
  styleUrls: ['./identification-admin.component.css'],
})
export class IdentificationAdminComponent implements OnInit {
  public infosUser: UserModel = new UserModel();

  public ObjetLogin: ConnectionUserModel = new ConnectionUserModel();

  public ObjetResponseConnection: ResponseConnectionUserModel = new ResponseConnectionUserModel();

  public isErreurLogin = false;

  public isvalidLogin = false;

  events: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: apiHttpSpringBootService,
    private cookie: CookieService,
    private datePipe: DatePipe,
    private ngxService: NgxUiLoaderService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Espace-identification');
    /* this.route.params.subscribe(params => {

      alert(params['action']);

    }) */
  }

  ngOnInit(): void {
    const date = new Date();
  }

  public onFormSubmitLogin() {
    this.ngxService.start();

    this.apiService.identificationUser(this.ObjetLogin).subscribe(
      (dataUser: ResponseConnectionUserModel) => {
        // console.log('IdentificationComponent/identification', dataUser);

        if (!dataUser) {
          this.isErreurLogin = true;
        } else {
          this.ObjetResponseConnection = dataUser;

          this.cookie.set(
            'ObjetResponseConnection',
            JSON.stringify(this.ObjetResponseConnection)
          );

          this.getDataUserCurrent(this.ObjetResponseConnection);
        }

        this.ngxService.stop();
      },
      (error: any) => {}
    );
  }

  public getDataUserCurrent(
    ObjetResponseConnection: ResponseConnectionUserModel
  ) {
    this.apiService.getDataUserCurrent(ObjetResponseConnection).subscribe(
      (dataUser: UserModel) => {
        console.log('dataUser=', dataUser);

        this.infosUser = dataUser;

        this.infosUser.typeCompte = 'admin';

        this.cookie.set('infosUser', JSON.stringify(this.infosUser));

        this.router.navigate(['/profilUser']);
      },
      (error: any) => {}
    );
  }
}
