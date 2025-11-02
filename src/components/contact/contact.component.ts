import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { emailValidator } from '../../shared/custom-email.validator';
import { NotificationService } from '../../services/notification.service';
import { environment } from '../../environments/environment';
import emailjs from '@emailjs/browser';

@Component({
    imports: [CommonModule, TranslateModule, ReactiveFormsModule],
    selector: 'rd-contact',
    templateUrl: 'contact.component.html',
    styleUrls: ['contact.component.scss'],
})
export class ContactComponent implements OnInit {
    contactForm!: FormGroup;
    loading = false;

    constructor(
        private notificationService: NotificationService,
        public translate: TranslateService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, emailValidator()]],
            message: ['', Validators.required],
        });
    }

    sendEmail() {
        if (this.loading) {
            return;
        }

        this.loading = true;
        const objEmailJS = {
            from_name: this.contactForm.value.name,
            reply_to: this.contactForm.value.email,
            message: this.contactForm.value.message,
        };
        emailjs
            .send(
                environment.emailjs.serviceId,
                environment.emailjs.templateId,
                objEmailJS,
                environment.emailjs.publicKey
            )
            .then(() => {
                this.contactForm.reset();
                this.notificationService.showSuccess(this.translate.instant('contact.successMessage'));
            })
            .catch(() => {
                this.notificationService.showError(this.translate.instant('contact.errorMessage'));
            })
            .finally(() => {
                this.loading = false;
            });
    }
}
