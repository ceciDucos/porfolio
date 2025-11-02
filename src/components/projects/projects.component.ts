import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
export class ProjectsComponent {
    translate = inject(TranslateService);

    projects: Project[] = [
        {
            id: 'auth-demo',
            title: 'projects.authDemo.title',
            description: 'projects.authDemo.description',
            technologies: ['Angular', 'TypeScript', 'JWT', 'RxJS', 'Signals'],
            image: 'assets/projects/auth-demo-app-1.png',
            githubUrl: 'https://github.com/ceciDucos/auth-demo-app',
            featured: true,
        },
        {
            id: 'basing-scribes',
            title: 'projects.basingScribes.title',
            description: 'projects.basingScribes.description',
            technologies: ['React', 'TypeScript', 'CSS', 'Vite'],
            image: 'assets/projects/basing-scribes.png',
            githubUrl: 'https://github.com/ceciDucos/BaSingScribesReact',
            featured: true,
        },
    ];

    filteredProjects: Project[] = this.projects;
    selectedFilter: string = 'all';

    filterProjects(technology: string): void {
        this.selectedFilter = technology;
        if (technology === 'all') {
            this.filteredProjects = this.projects;
        } else {
            this.filteredProjects = this.projects.filter((project) => project.technologies.includes(technology));
        }
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
