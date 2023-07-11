import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  otp: string = '';

  onSubmit() {
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      const form = document.querySelector('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          ac.abort();
        });
      }
      const something: any = navigator.credentials;
      something
        .get({
          otp: { transport: ['sms'] },
          signal: ac.signal,
        })
        .then((otp: any) => {
          this.otp = otp.code;
          if (form) form.submit();
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }
}
