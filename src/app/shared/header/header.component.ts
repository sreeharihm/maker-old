import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public showProfile = false;
  public userDetails = null;
  public profileImage = '';
  @Output('downloadFiles') downloadFiles: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router,public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUsers().then(result => {  
      this.userDetails = { name : result.payload.val().displayName, email: result.payload.val().emailId, phone: result.payload.val().phoneNo, photoUrl: result.payload.val().imageData };      
      this.profileImage = this.userDetails.name.split(' ').map(name => name[0]).join('').toUpperCase();
    })
  }

  readyToDownload() {
    this.downloadFiles.emit();
  }

  redirectToUpdate() {
    this.router.navigateByUrl('home/myProfile');
  }

}
