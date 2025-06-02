import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    imports: [TranslateModule],
    selector: 'rd-skills',
    templateUrl: 'skills.component.html',
    styleUrls: ['skills.component.scss'],
})
export class SkillsComponent {
    constructor(public translate: TranslateService) {}
}
