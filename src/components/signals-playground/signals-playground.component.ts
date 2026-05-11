import { Component, signal, computed, effect, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LogEntry {
    message: string;
    type: 'signal' | 'computed' | 'effect';
    timestamp: string;
}

@Component({
    selector: 'rd-signals-playground',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'signals-playground.component.html',
    styleUrls: ['signals-playground.component.scss'],
})
export class SignalsPlaygroundComponent implements OnInit, OnDestroy {
    private scrollObserver?: IntersectionObserver;

    priceSignal = signal(100);
    quantitySignal = signal(1);
    discountSignal = signal(0);

    subtotal = computed(() => this.priceSignal() * this.quantitySignal());
    discountAmount = computed(() => this.subtotal() * (this.discountSignal() / 100));
    total = computed(() => this.subtotal() - this.discountAmount());

    logs = signal<LogEntry[]>([]);

    private getTime(): string {
        return new Date().toLocaleTimeString('en-US', { hour12: false });
    }

    private addLog(message: string, type: LogEntry['type']): void {
        this.logs.update(l => [{ message, type, timestamp: this.getTime() }, ...l].slice(0, 6));
    }

    constructor(private elementRef: ElementRef) {
        effect(() => {
            const t = this.total();
            this.addLog(`effect() → total updated to $${t.toFixed(2)}`, 'effect');
        });
    }

    ngOnInit(): void {
        this.scrollObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        setTimeout(() => {
            const elements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
            elements.forEach((el: Element) => this.scrollObserver?.observe(el));
        }, 100);
    }

    ngOnDestroy(): void {
        this.scrollObserver?.disconnect();
    }

    increasePrice(): void {
        this.priceSignal.update(v => v + 10);
        this.addLog(`signal(price).set(${this.priceSignal()})`, 'signal');
    }

    decreasePrice(): void {
        this.priceSignal.update(v => Math.max(10, v - 10));
        this.addLog(`signal(price).set(${this.priceSignal()})`, 'signal');
    }

    increaseQty(): void {
        this.quantitySignal.update(v => Math.min(10, v + 1));
        this.addLog(`signal(quantity).set(${this.quantitySignal()})`, 'signal');
    }

    decreaseQty(): void {
        this.quantitySignal.update(v => Math.max(1, v - 1));
        this.addLog(`signal(quantity).set(${this.quantitySignal()})`, 'signal');
    }

    applyDiscount(pct: number): void {
        this.discountSignal.set(pct);
        this.addLog(`signal(discount).set(${pct}%)`, 'signal');
        this.addLog(`computed(discountAmount) → $${this.discountAmount().toFixed(2)}`, 'computed');
    }

    reset(): void {
        this.priceSignal.set(100);
        this.quantitySignal.set(1);
        this.discountSignal.set(0);
        this.logs.set([]);
    }
}
