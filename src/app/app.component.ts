import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { WorkInProgressComponent } from '../components/work-in-progress/work-in-progress.component';
import { NotificationComponent } from '../components/notification/notification.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CommonModule, WorkInProgressComponent, NotificationComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'porfolio';
    isWorkInProgress = environment.features.workInProgress;

    constructor(private translate: TranslateService) {
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }
}
