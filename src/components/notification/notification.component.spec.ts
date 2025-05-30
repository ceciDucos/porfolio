import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
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
});
