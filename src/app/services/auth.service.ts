import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any;
@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('GzseZn08PZZ1axzCNZQuNdQBu24eyxJF', 'ekrako.auth0.com', {});
  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      this.lock.getProfile(authResult.idToken, function(error: any, profile: any) {
        if (error) {
          throw new Error(error);
        }
        //ste Token
        localStorage.setItem('id_token', authResult.idToken);
        //Set Profile
        localStorage.setItem('profile', JSON.stringify(profile));
      });
    });
  }
  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    // Remove profile from localStorage
    localStorage.removeItem('profile');
  }
}
