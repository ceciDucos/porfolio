import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    imports: [TranslateModule],
    selector: 'rd-references',
    templateUrl: 'references.component.html',
    styleUrls: ['references.component.scss'],
})
export class ReferencesComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
