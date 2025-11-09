import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReferencesComponent } from './references.component';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

describe('ReferencesComponent', () => {
    let component: ReferencesComponent;
    let fixture: ComponentFixture<ReferencesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReferencesComponent,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ReferencesComponent);
        component = fixture.componentInstance;

        const translateService = TestBed.inject(TranslateService);
        translateService.setDefaultLang('en');
        translateService.use('en');

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize IntersectionObserver on init', () => {
        expect(component['observer']).toBeDefined();
    });

    it('should disconnect observer on destroy', () => {
        const disconnectSpy = spyOn(component['observer']!, 'disconnect');
        component.ngOnDestroy();
        expect(disconnectSpy).toHaveBeenCalled();
    });

    it('should render section with references id', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const section = compiled.querySelector('section');
        expect(section?.id).toBe('references');
    });
});
