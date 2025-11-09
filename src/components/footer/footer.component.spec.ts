import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FooterComponent,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;

        const translateService = TestBed.inject(TranslateService);
        translateService.setDefaultLang('en');
        translateService.use('en');

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render footer element', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('footer')).toBeTruthy();
    });

    it('should have footer class', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const footer = compiled.querySelector('footer');
        expect(footer?.classList.contains('footer')).toBeTrue();
    });
});
