import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Facebook } from '@ionic-native/facebook/ngx';

import { AuthService } from '../../services/auth/auth.service';
import { APIService } from '../../services/api/api.service';
import { User } from '../../services/api/models';
import { LocationService } from '../../services/location/location.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    validations_form: FormGroup;
    user: User = null;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private loadingCtrl: LoadingController,
		private fb: Facebook,
        private authService: AuthService,
        private api: APIService,
        private locationService: LocationService,
    ) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.api.getMe().subscribe(user => {
            this.user = user;
        });
        this.resetUserFormFields();
    }

    facebookConnect() {
        const permissions = [
            'public_profile',
            'email',
            //'user_friends',
        ];
        this.fb.login(permissions)
		.then(response => {
			let userId = response.authResponse.userID;

			// Get name from API
			this.fb.api('/me?fields=name', permissions)
			.then(user => {
                this.api.facebookConnect(userId, user.name).subscribe(response => {
                    this.getData();
                });
			});
		}, error =>{
			console.log(error);
		});
    }

    facebookDisconnect() {
        this.fb.logout()
		.then(response => {
            this.api.facebookDisconnect().subscribe(response => {
                this.getData();
            });
		}, error =>{
			console.log(error);
		});
    }

    resetUserFormFields() {
        this.validations_form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
        });
    }
    async submitUserForm(form) {
        let data = form.value;
        const loading = await this.loadingCtrl.create({
            message: 'Saving...'
        });
        await loading.present();
        this.api.updateMe(data).subscribe(user => {
            loading.dismiss();
            this.router.navigate(['/profile']);
        });
    }

    logout(){
        this.authService.logout();
    }
}
