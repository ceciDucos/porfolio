import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification, NotificationType } from '../models/notification';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private notificationSubject = new Subject<Notification>();
    notification$ = this.notificationSubject.asObservable();

    showSuccess(message: string) {
        this.notificationSubject.next({ message, type: NotificationType.Success });
    }

    showError(message: string) {
        this.notificationSubject.next({ message, type: NotificationType.Error });
    }
}
