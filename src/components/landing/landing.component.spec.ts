import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LandingComponent', () => {
    let component: LandingComponent;
    let fixture: ComponentFixture<LandingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                LandingComponent,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
                }),
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(LandingComponent);
        component = fixture.componentInstance;

        const translateService = TestBed.inject(TranslateService);
        translateService.setDefaultLang('en');
        translateService.use('en');

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with menu closed', () => {
        expect(component.isOpen).toBeFalse();
    });

    it('should open menu', () => {
        component.openMenu();
        expect(component.isOpen).toBeTrue();
    });

    it('should close menu', () => {
        component.isOpen = true;
        component.closeMenu();
        expect(component.isOpen).toBeFalse();
    });

    it('should close menu on escape key', () => {
        component.isOpen = true;
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        component.handleEscape(event);
        expect(component.isOpen).toBeFalse();
    });

    it('should have translate service injected', () => {
        expect(component.translate).toBeDefined();
    });
});
