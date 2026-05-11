import { Component, ElementRef, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Certificate {
    title: string;
    issuer: string;
    date: string;
    url: string;
    theme?: string;
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
            theme: 'angular'
        },
        {
            title: 'Claude 101',
            issuer: 'Anthropic',
            date: '2025',
            url: 'https://verify.skilljar.com/c/k6q4b4fnqpcr',
            theme: 'anthropic'
        },
        {
            title: 'Claude Code for Vibe Coding',
            issuer: 'Anthropic',
            date: '2025',
            url: 'assets/certificates/Cecilia Ducos - Claude Code for Vibe Coding.pdf',
            theme: 'anthropic'
        },
        {
            title: 'Claude in Action',
            issuer: 'Anthropic',
            date: '2025',
            url: 'https://verify.skilljar.com/c/28izu57owmkg',
            theme: 'anthropic'
        },
        {
            title: 'Gen AI in SDLC',
            issuer: 'Anthropic',
            date: '2025',
            url: 'assets/certificates/Cecilia Ducos Foundations of Generative AI in SDLC Training.pdf',
            theme: 'anthropic'
        },
        {
            title: 'AWS Cloud Practitioner Essentials',
            issuer: 'Amazon Web Services',
            date: '2024',
            url: 'assets/certificates/Cecilia Ducos AWS Cloud Practitioner Essentials.pdf',
            theme: 'aws'
        },
        {
            title: 'AWS Foundations',
            issuer: 'Amazon Web Services',
            date: '2024',
            url: 'assets/certificates/Cecilia Ducos AWS Foundations- Getting Started with the AWS Cloud Essentials.pdf',
            theme: 'aws'
        },
        {
            title: 'React For The Rest Of Us',
            issuer: 'Udemy',
            date: '2023',
            url: 'assets/certificates/Cecilia Ducos React For The Rest Of Us.pdf',
            theme: 'react'
        },
        {
            title: 'SQL Basics',
            issuer: 'HackerRank',
            date: '2023',
            url: 'assets/certificates/Cecilia Ducos SQL Basic.pdf',
            theme: 'default'
        },
        {
            title: 'Accessible Web Design',
            issuer: 'Udemy',
            date: '2023',
            url: 'assets/certificates/Learn Accessible Web Design Certificate - Cecilia Ducos.pdf',
            theme: 'default'
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
