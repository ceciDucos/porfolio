import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { NotificationService } from '../../services/notification.service';
import { NotificationType, Notification } from '../../models/notification';
import { Subject } from 'rxjs';

describe('NotificationComponent', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;
    let notificationSubject: Subject<Notification>;

    beforeEach(() => {
        notificationSubject = new Subject<Notification>();

        TestBed.configureTestingModule({
            imports: [NotificationComponent],
        });

        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display notification when emitted', () => {
        const notif: Notification = {
            message: 'Test Message',
            type: NotificationType.Success,
        };

        notificationSubject.next(notif);
        fixture.detectChanges();

        const text = fixture.nativeElement.textContent;
        expect(text).toContain('Test Message');
        expect(component.notification).toEqual(notif);
    });

    it('should auto-dismiss after 3 seconds', fakeAsync(() => {
        const notif: Notification = {
            message: 'Auto hide',
            type: NotificationType.Error,
        };

        notificationSubject.next(notif);
        fixture.detectChanges();
        expect(component.notification).toEqual(notif);

        tick(3000);
        fixture.detectChanges();

        expect(component.notification).toBeNull();
    }));
});
