import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

@Component({
    standalone: true,
    imports: [CommonModule, TranslateModule, ReactiveFormsModule],
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
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
export class HomeComponent implements OnInit {
    contactForm!: FormGroup;
    messageSent = false;
    errorMessage = '';
    loading = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
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
                // Reset form after successful submission
                this.contactForm.reset();
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                this.loading = false;
            });
    }
}
