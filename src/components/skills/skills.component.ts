import { Component, ElementRef, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'rd-skills',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit, OnDestroy {
    private observer?: IntersectionObserver;

    private elementRef = inject(ElementRef);

    ngOnInit(): void {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
        );
        setTimeout(() => {
            const elements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
            elements.forEach((el: Element) => this.observer?.observe(el));
        }, 100);
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}
