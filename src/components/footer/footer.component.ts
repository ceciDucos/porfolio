import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    imports: [TranslateModule],
    selector: 'rd-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss'],
})
export class FooterComponent {
    translate = inject(TranslateService);
}
