import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [CommonModule, TranslateModule],
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    animations: [
        trigger('fadeInName', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('800ms ease-in', style({ opacity: 1 }))
            ])
        ]),
        trigger('fadeInSlideUpTitle', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(100px)' }),
                animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ]),
        trigger('fadeInSlideDescription', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(100px)' }),
                animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ]),
    ],
})

export class HomeComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}