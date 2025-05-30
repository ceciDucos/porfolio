import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { NotificationType } from '../models/notification';

describe('NotificationService', () => {
    let service: NotificationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NotificationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should emit a success notification', (done) => {
        service.notification$.subscribe((notif) => {
            expect(notif).toEqual({
                message: 'Success!',
                type: NotificationType.Success,
            });
            done();
        });

        service.showSuccess('Success!');
    });

    it('should emit an error notification', (done) => {
        service.notification$.subscribe((notif) => {
            expect(notif).toEqual({
                message: 'Oops!',
                type: NotificationType.Error,
            });
            done();
        });

        service.showError('Oops!');
    });
});
