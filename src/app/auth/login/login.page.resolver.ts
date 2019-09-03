import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class LoginPageResolver implements Resolve<any> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot) {
    // Get the Shell Provider from the service
    const userData = route.paramMap.get('data');


    // Resolve with Shell Provider
      const observablePromise = new Promise((resolve, reject) => {
        resolve(userData);
      });
      return observablePromise;
    }
  }

