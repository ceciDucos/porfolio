import { Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    theme = signal<Theme>('dark');

    toggleTheme(): void {
        this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
        document.documentElement.classList.toggle('light-theme', this.theme() === 'light');
    }
}
