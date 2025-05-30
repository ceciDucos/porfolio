import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';

describe('AppComponent', () => {
    const translateServiceMock = {
        setDefaultLang: () => {},
        use: () => {},
    };

    TestBed.configureTestingModule({
        imports: [AppComponent],
        providers: [{ provide: TranslateService, useValue: translateServiceMock }],
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
