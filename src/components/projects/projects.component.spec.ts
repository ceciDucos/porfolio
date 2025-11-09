import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

describe('ProjectsComponent', () => {
    let component: ProjectsComponent;
    let fixture: ComponentFixture<ProjectsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ProjectsComponent,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectsComponent);
        component = fixture.componentInstance;

        const translateService = TestBed.inject(TranslateService);
        translateService.setDefaultLang('en');
        translateService.use('en');

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with all projects', () => {
        expect(component.projects.length).toBe(3);
        expect(component.filteredProjects.length).toBe(3);
    });

    it('should have correct project structure', () => {
        const project = component.projects[0];
        expect(project.id).toBeDefined();
        expect(project.title).toBeDefined();
        expect(project.description).toBeDefined();
        expect(project.technologies).toBeDefined();
        expect(project.image).toBeDefined();
        expect(project.githubUrl).toBeDefined();
        expect(project.featured).toBeDefined();
    });

    it('should filter projects by technology', () => {
        component.filterProjects('Angular');
        expect(component.filteredProjects.length).toBe(2);
        expect(component.selectedFilter).toBe('Angular');
    });

    it('should show all projects when filter is "all"', () => {
        component.filterProjects('Angular');
        component.filterProjects('all');
        expect(component.filteredProjects.length).toBe(3);
        expect(component.selectedFilter).toBe('all');
    });

    it('should filter projects by React', () => {
        component.filterProjects('React');
        expect(component.filteredProjects.length).toBe(1);
        expect(component.filteredProjects[0].id).toBe('basing-scribes');
    });

    it('should return all featured projects', () => {
        const featured = component.featuredProjects;
        expect(featured.length).toBe(3);
        expect(featured.every((p) => p.featured)).toBeTrue();
    });

    it('should return unique technologies', () => {
        const techs = component.allTechnologies;
        expect(techs).toContain('Angular');
        expect(techs).toContain('TypeScript');
        expect(techs).toContain('React');
        expect(techs).toContain('JavaScript');
    });

    it('should initialize IntersectionObserver on init', () => {
        expect(component['observer']).toBeDefined();
    });

    it('should disconnect observer on destroy', () => {
        const disconnectSpy = spyOn(component['observer']!, 'disconnect');
        component.ngOnDestroy();
        expect(disconnectSpy).toHaveBeenCalled();
    });
});
