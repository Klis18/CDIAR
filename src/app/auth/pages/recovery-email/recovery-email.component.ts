import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Email } from '../../interfaces/email';
import { EmailVerification } from '../../interfaces/email-verification';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recovery-email',
  templateUrl: './recovery-email.component.html',
  styles: ``
})
export class RecoveryEmailComponent {
  value: any;

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
  ) {}

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