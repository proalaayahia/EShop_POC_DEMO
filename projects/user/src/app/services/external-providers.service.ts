import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { inject, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExternalProvidersService implements OnInit {
  private socialAuthService: SocialAuthService=inject(SocialAuthService)
  socialUser!: SocialUser;
  isLoggedin?: boolean = undefined;
  // googleClient = environment.providersKeys.google.clientId
  auth2: any;
  googleProfile!: any
  private extAuthChangeSub = new Subject<SocialUser>()

  constructor() {
    this.socialAuthService.authState.subscribe({
      next:(user:any) => {
        console.log(user)
        this.extAuthChangeSub.next(user)
      },
      error:(err:any)=>console.log(err)
    })
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe({
      next:(user:any) => {
        this.socialUser = user;
        this.isLoggedin = user != null;
      },
      error:(err:any)=>console.log(err)
    });
  }
  //***********facebook provider***************//
  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.socialAuthService.signOut();
  }


  //***********google provider************* */
  signInWithGoogle = () => {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
