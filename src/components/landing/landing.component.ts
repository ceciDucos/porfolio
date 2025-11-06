import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContactComponent } from '../contact/contact.component';
import { SkillsComponent } from '../skills/skills.component';
import { FooterComponent } from '../footer/footer.component';
import { ReferencesComponent } from '../references/references.component';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
    imports: [CommonModule, TranslateModule, ContactComponent, FooterComponent, ReferencesComponent, ProjectsComponent],
    selector: 'landing',
    templateUrl: 'landing.component.html',
    styleUrls: ['landing.component.scss'],
    animations: [
        trigger('fadeInName', [
            transition(':enter', [style({ opacity: 0 }), animate('800ms ease-in', style({ opacity: 1 }))]),
        ]),
        trigger('fadeInSlideUpTitle', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(100px)' }),
                animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
        ]),
        trigger('fadeInSlideDescription', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(100px)' }),
                animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
        ]),
    ],
})
export class LandingComponent {
    isOpen = false;

    @HostListener('document:keydown.escape', ['$event'])
    handleEscape(event: KeyboardEvent): void {
        this.closeMenu();
    }

    constructor(public translate: TranslateService) {}

    closeMenu() {
        this.isOpen = false;
    }

    openMenu() {
        this.isOpen = true;
    }
}
