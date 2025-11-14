import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';
import { ReferencesComponent } from '../references/references.component';
import { ProjectsComponent } from '../projects/projects.component';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
}

@Component({
    imports: [CommonModule, TranslateModule, ContactComponent, FooterComponent, ReferencesComponent, ProjectsComponent],
    selector: 'landing',
    templateUrl: 'landing.component.html',
    styleUrls: ['landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
    isOpen = false;
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private mouseX = 0;
    private mouseY = 0;
    private animationId?: number;

    @HostListener('document:keydown.escape')
    handleEscape(): void {
        this.closeMenu();
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent): void {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    }

    constructor(public translate: TranslateService, private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.initCanvas();
        this.createParticles();
        this.animate();
    }

    ngOnDestroy(): void {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }

    private initCanvas(): void {
        this.canvas = this.renderer.createElement('canvas');
        this.canvas.classList.add('landing__canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';

        this.updateCanvasSize();
        this.renderer.appendChild(document.body, this.canvas);
        this.ctx = this.canvas.getContext('2d')!;

        window.addEventListener('resize', () => {
            this.updateCanvasSize();
            this.recreateParticles();
        });
    }

    private updateCanvasSize(): void {
        const footer = document.querySelector('footer');
        if (footer) {
            const footerTop = footer.getBoundingClientRect().top + window.scrollY;
            this.canvas.width = window.innerWidth;
            this.canvas.height = footerTop;
            this.canvas.style.height = `${footerTop}px`;
        } else {
            this.canvas.width = window.innerWidth;
            this.canvas.height = document.body.scrollHeight;
            this.canvas.style.height = `${document.body.scrollHeight}px`;
        }
    }

    private recreateParticles(): void {
        this.particles = [];
        this.createParticles();
    }

    private createParticles(): void {
        const screenArea = this.canvas.width * this.canvas.height;
        const densityFactor = window.innerWidth < 768 ? 25000 : 15000;
        const particleCount = Math.floor(screenArea / densityFactor);

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
            });
        }
    }

    private animate(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, i) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.x -= dx * force * 0.03;
                particle.y -= dy * force * 0.03;
            }

            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(69, 151, 247, ${particle.opacity})`;
            this.ctx.fill();

            this.particles.slice(i + 1).forEach((otherParticle) => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - distance / 120)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    closeMenu() {
        this.isOpen = false;
    }

    openMenu() {
        this.isOpen = true;
    }
}
