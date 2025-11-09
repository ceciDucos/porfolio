import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';
import { ReferencesComponent } from '../references/references.component';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
    imports: [CommonModule, TranslateModule, ContactComponent, FooterComponent, ReferencesComponent, ProjectsComponent],
    selector: 'landing',
    templateUrl: 'landing.component.html',
    styleUrls: ['landing.component.scss'],
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
