import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { NotificationService } from '../../services/notification.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('ContactComponent', () => {
    let component: ContactComponent;
    let fixture: ComponentFixture<ContactComponent>;
    let notificationService: jasmine.SpyObj<NotificationService>;

    beforeEach(async () => {
        const notificationSpy = jasmine.createSpyObj('NotificationService', ['success', 'error']);

        await TestBed.configureTestingModule({
            imports: [
                ContactComponent,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
                }),
                ReactiveFormsModule,
            ],
            providers: [{ provide: NotificationService, useValue: notificationSpy }],
        }).compileComponents();

        fixture = TestBed.createComponent(ContactComponent);
        component = fixture.componentInstance;
        notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;

        const translateService = TestBed.inject(TranslateService);
        translateService.setDefaultLang('en');
        translateService.use('en');

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize contact form with empty values', () => {
        expect(component.contactForm.get('name')?.value).toBe('');
        expect(component.contactForm.get('email')?.value).toBe('');
        expect(component.contactForm.get('message')?.value).toBe('');
    });

    it('should mark form as invalid when empty', () => {
        expect(component.contactForm.valid).toBeFalse();
    });

    it('should validate required fields', () => {
        const form = component.contactForm;
        expect(form.get('name')?.hasError('required')).toBeTrue();
        expect(form.get('email')?.hasError('required')).toBeTrue();
        expect(form.get('message')?.hasError('required')).toBeTrue();
    });

    it('should validate email format', () => {
        const emailControl = component.contactForm.get('email');
        emailControl?.setValue('invalid-email');
        expect(emailControl?.valid).toBeFalse();

        emailControl?.setValue('valid@email.com');
        expect(emailControl?.valid).toBeTrue();
    });

    it('should mark form as valid with correct data', () => {
        component.contactForm.get('name')?.setValue('John Doe');
        component.contactForm.get('email')?.setValue('john@example.com');
        component.contactForm.get('message')?.setValue('This is a test message');
        expect(component.contactForm.valid).toBeTrue();
    });

    it('should have IntersectionObserver initialized', () => {
        expect(component['observer']).toBeDefined();
    });

    it('should disconnect observer on destroy', () => {
        const disconnectSpy = spyOn(component['observer']!, 'disconnect');
        component.ngOnDestroy();
        expect(disconnectSpy).toHaveBeenCalled();
    });
});
