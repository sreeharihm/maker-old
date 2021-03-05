import { Component, OnInit } from '@angular/core';
import { User } from "../../shared/services/user";
import { AuthService } from "../../shared/services/auth.service";
import { EditSettingsService } from '../../shared/services/edit-settings.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public email: string;
  public displayName: string;
  public phone: string
  public photoURL: string;
  items: Array<any>;
  constructor(private authService: AuthService, private editservice: EditSettingsService) { }

  ngOnInit(): void {
    this.displayName="";
    this.phone="";
    this.photoURL="";
    this.authService.getUsers().then(result => {
      this.displayName = result.payload.val().displayName;
      this.phone = result.payload.val().phoneNo;
      this.photoURL = result.payload.val().imageData;
    })
  }

  updateProfile() {
    if(this.displayName.length > 0)
      this.authService.UpdateUserData(this.displayName,this.photoURL,this.phone);
  }
  onSelectFileChange($event) {

		//cancel check
		let files = $event.srcElement.files;
		if (files.length > 0) {

			//base64 encode file (TODO extract to a service)
			let reader = new FileReader();
			reader.onload = (e) => {
				this.photoURL = (<FileReader>e.target).result as string;
			};
			reader.readAsDataURL($event.srcElement.files[0]);
			
		}
	}
  processImgUrl(url) {
		return this.editservice.processImgUrl(url, 200, 100);
	}
}
