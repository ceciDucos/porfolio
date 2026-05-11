import { Component, ElementRef, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Certificate {
    title: string;
    issuer: string;
    date: string;
    url: string;
    description: string;
}

@Component({
    selector: 'rd-certificates',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'certificates.component.html',
    styleUrls: ['certificates.component.scss'],
})
export class CertificatesComponent implements OnInit, OnDestroy {
    private observer?: IntersectionObserver;

    private elementRef = inject(ElementRef);

    ngOnInit(): void {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        setTimeout(() => {
            const elements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
            elements.forEach((el: Element) => this.observer?.observe(el));
        }, 100);
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }

    certificates: Certificate[] = [
        {
            title: 'Angular Developer',
            issuer: 'Certificates.dev',
            date: '2025',
            url: 'https://certificates.dev/angular/certificates/9ead0045-8498-4f7e-b57e-b74b2292f392',
            description: 'Certified proficiency in advanced Angular concepts, architecture, and real-world application development.',
        },
        {
            title: 'Claude 101',
            issuer: 'Anthropic',
            date: '2025',
            url: 'https://verify.skilljar.com/c/k6q4b4fnqpcr',
            description: 'Foundations of building with Claude: prompting, context windows, and responsible AI usage.',
        },
        {
            title: 'Claude Code for Vibe Coding',
            issuer: 'Anthropic',
            date: '2025',
            url: 'assets/certificates/Cecilia Ducos - Claude Code for Vibe Coding.pdf',
            description: 'Advanced AI-assisted development and rapid prototyping using Claude Code.',
        },
        {
            title: 'Claude in Action',
            issuer: 'Anthropic',
            date: '2025',
            url: 'https://verify.skilljar.com/c/28izu57owmkg',
            description: 'Hands-on application development integrating Claude into real-world software projects.',
        },
        {
            title: 'Gen AI in SDLC',
            issuer: 'Anthropic',
            date: '2025',
            url: 'assets/certificates/Cecilia Ducos Foundations of Generative AI in SDLC Training.pdf',
            description: 'Foundations of Generative AI in the Software Development Life Cycle.',
        },
        {
            title: 'AWS Cloud Practitioner Essentials',
            issuer: 'Amazon Web Services',
            date: '2024',
            url: 'assets/certificates/Cecilia Ducos AWS Cloud Practitioner Essentials.pdf',
            description: 'Foundational understanding of AWS Cloud concepts, security, and core services.',
        },
        {
            title: 'AWS Foundations',
            issuer: 'Amazon Web Services',
            date: '2024',
            url: 'assets/certificates/Cecilia Ducos AWS Foundations- Getting Started with the AWS Cloud Essentials.pdf',
            description: 'Getting started with the AWS Cloud essentials and infrastructure.',
        },
        {
            title: 'React For The Rest Of Us',
            issuer: 'Udemy',
            date: '2023',
            url: 'assets/certificates/Cecilia Ducos React For The Rest Of Us.pdf',
            description: 'Modern React development with hooks, context, and state management.',
        },
        {
            title: 'SQL Basics',
            issuer: 'HackerRank',
            date: '2023',
            url: 'assets/certificates/Cecilia Ducos SQL Basic.pdf',
            description: 'Core concepts of relational databases, queries, and data manipulation.',
        },
        {
            title: 'Accessible Web Design',
            issuer: 'Udemy',
            date: '2023',
            url: 'assets/certificates/Learn Accessible Web Design Certificate - Cecilia Ducos.pdf',
            description: 'Building inclusive, WCAG-compliant web experiences for all users.',
        }
    ];

    showAll = signal(false);
    visibleCertificates = computed(() => this.showAll() ? this.certificates : this.certificates.slice(0, 3));

    toggleShowAll(): void {
        this.showAll.update(val => !val);
        // Retrigger intersection observer for new elements
        setTimeout(() => {
            const elements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll:not(.visible)');
            elements.forEach((el: Element) => this.observer?.observe(el));
        }, 50);
    }
}
