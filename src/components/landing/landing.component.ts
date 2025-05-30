import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';
import { emailValidator } from '../../shared/custom-email.validator';
import { NotificationService } from '../../services/notification.service';

@Component({
    imports: [CommonModule, TranslateModule, ReactiveFormsModule],
    selector: 'landing',
    templateUrl: 'landing.component.html',
    styleUrls: ['landing.component.scss'],
    animations: [
        trigger('fadeInName', [
            transition(':enter', [style({ opacity: 0 }), animate('800ms ease-in', style({ opacity: 1 }))]),
        ]),
        trigger('fadeInSlideUpTitle', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(100px)' }),
                animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
        ]),
        trigger('fadeInSlideDescription', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(100px)' }),
                animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
        ]),
    ],
})
export class LandingComponent implements OnInit {
    contactForm!: FormGroup;
    loading = false;
    isOpen = false;

    @HostListener('document:keydown.escape', ['$event'])
    handleEscape(event: KeyboardEvent): void {
        this.closeMenu();
    }

    closeMenu() {
        this.isOpen = false;
    }

    openMenu() {
        this.isOpen = true;
    }

    constructor(
        private fb: FormBuilder,
        private notificationService: NotificationService,
        public translate: TranslateService
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
                console.log(this.contactForm.value);
                this.notificationService.showSuccess(this.translate.instant('contact.successMessage'));
            })
            .catch((error) => {
                this.notificationService.showError(this.translate.instant('contact.errorMessage'));
                console.error(error);
            })
            .finally(() => {
                this.loading = false;
            });
    }
}
