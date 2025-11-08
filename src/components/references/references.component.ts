import { Component, OnInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    imports: [TranslateModule],
    selector: 'rd-references',
    templateUrl: 'references.component.html',
    styleUrls: ['references.component.scss'],
})
export class ReferencesComponent implements OnInit, OnDestroy {
    elementRef = inject(ElementRef);
    private observer?: IntersectionObserver;

    ngOnInit() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        setTimeout(() => {
            const elements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
            elements.forEach((el: Element) => this.observer?.observe(el));
        }, 100);
    }

    ngOnDestroy() {
        this.observer?.disconnect();
    }
}
