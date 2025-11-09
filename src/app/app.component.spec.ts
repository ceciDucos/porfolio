import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AppComponent,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
                }),
            ],
            providers: [provideRouter([])],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should have title "porfolio"', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('porfolio');
    });

    it('should initialize translate service', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const translateService = TestBed.inject(TranslateService);
        spyOn(translateService, 'setDefaultLang');
        spyOn(translateService, 'use');

        new AppComponent(translateService);

        expect(translateService.setDefaultLang).toHaveBeenCalledWith('en');
        expect(translateService.use).toHaveBeenCalledWith('en');
    });
});
