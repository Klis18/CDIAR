import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Email } from '../../interfaces/email';
import { EmailVerification } from '../../interfaces/email-verification';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styles: ``
})
export class RecoveryPasswordComponent {
  value: any;
  siteKey:string;

  public userGroup = new FormGroup({
    email: new FormControl<string>(''),
    token: new FormControl<string>(''),
  });

  public emailGroup = new FormGroup({
    email: new FormControl<string>(''),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.siteKey='6Ld5KuQpAAAAAEY05mmbzmOX0lO9teZ8VAlyUUOO';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const email = params['email'];
      this.userGroup.get('email')?.setValue(email);
    });
  }

  get emailVerification(): EmailVerification {
    return this.userGroup.value as EmailVerification;
  }

  get email(): Email {
    return this.emailGroup.value as Email;
  }

  onSubmit() {
    if (this.userGroup.invalid) return;

    this.authService.verifyUser(this.emailVerification).subscribe((email) => {
      this.router.navigate(['/auth/login']);
    });
  }

  reenviarCorreo() {
    this.authService.resendVerificationMail(this.email).subscribe((email) => {
      this.router.navigate(['/auth/verify']);
    });
  }
}
