import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy, ElementRef, AfterViewChecked } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    image: string;
    githubUrl: string;
    featured: boolean;
}

@Component({
    selector: 'rd-projects',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy, AfterViewChecked {
    translate = inject(TranslateService);
    elementRef = inject(ElementRef);

    private observer?: IntersectionObserver;
    private needsReobserve = false;

    projects: Project[] = [
        {
            id: 'task-flow',
            title: 'projects.taskFlow.title',
            description: 'projects.taskFlow.description',
            technologies: ['Angular', 'TypeScript', 'NgRx', 'Angular Material', 'Signals', 'SCSS'],
            image: 'projects/task-flow-ngrx-app-1.png',
            githubUrl: 'https://github.com/ceciDucos/task-flow-ngrx',
            featured: true,
        },
        {
            id: 'auth-demo',
            title: 'projects.authDemo.title',
            description: 'projects.authDemo.description',
            technologies: ['Angular', 'TypeScript', 'JWT', 'RxJS', 'Signals', 'SCSS'],
            image: 'projects/auth-demo-app-1.png',
            githubUrl: 'https://github.com/ceciDucos/auth-demo-app',
            featured: true,
        },
        {
            id: 'basing-scribes',
            title: 'projects.basingScribes.title',
            description: 'projects.basingScribes.description',
            technologies: ['React', 'JavaScript'],
            image: 'projects/ba-sing-scribes-app-1.png',
            githubUrl: 'https://github.com/ceciDucos/BaSingScribesReact',
            featured: true,
        },
    ];

    filteredProjects: Project[] = this.projects;
    selectedFilter: string = 'all';

    ngOnInit(): void {
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

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }

    ngAfterViewChecked(): void {
        if (this.needsReobserve) {
            this.needsReobserve = false;
            setTimeout(() => {
                const elements = this.elementRef.nativeElement.querySelectorAll('.project-card.animate-on-scroll');
                elements.forEach((el: Element) => this.observer?.observe(el));
            }, 0);
        }
    }

    filterProjects(technology: string): void {
        this.selectedFilter = technology;
        if (technology === 'all') {
            this.filteredProjects = this.projects;
        } else {
            this.filteredProjects = this.projects.filter((project) => project.technologies.includes(technology));
        }
        this.needsReobserve = true;
    }

    get featuredProjects(): Project[] {
        return this.projects.filter((p) => p.featured);
    }

    get allTechnologies(): string[] {
        const techs = new Set<string>();
        this.projects.forEach((project) => {
            project.technologies.forEach((tech) => techs.add(tech));
        });
        return Array.from(techs).sort();
    }
}
