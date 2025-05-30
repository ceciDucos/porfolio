import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification';
import { NotificationType } from '../../models/notification';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class NotificationComponent implements OnInit, OnDestroy {
    notification: Notification | null = null;
    private sub!: Subscription;
    NotifType = NotificationType;

    constructor(private notificationService: NotificationService) {}

    ngOnInit(): void {
        this.sub = this.notificationService.notification$.subscribe((notif) => {
            this.notification = notif;

            // Auto dismiss after 3 seconds
            timer(3000).subscribe(() => (this.notification = null));
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
