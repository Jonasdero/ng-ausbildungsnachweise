import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _currentId = 0;
  private _standardDuration = 10;

  notifications: NotificationContent[] = [];

  @Output() notificationChange: EventEmitter<NotificationContent[]> = new EventEmitter();
  constructor() { }

  private addNotification(notification: NotificationContent) {
    this.notifications.push(notification);
    this.notificationChange.emit(this.notifications);
  }

  removeNotification(notification: NotificationContent) {
    this.notifications.splice(this.notifications.findIndex((n) => n.id === notification.id), 1);
    this.notificationChange.emit(this.notifications);
  }

  info(text: string, duration?: number) {
    if (!duration) {
      duration = this._standardDuration;
    }
    this.addNotification({ id: this._currentId++, text: text, duration: duration, type: 0 });
  }

  warning(text: string, duration?: number) {
    if (!duration) {
      duration = this._standardDuration;
    }
    this.addNotification({ id: this._currentId++, text: text, duration: duration, type: 1 });
  }

  error(text: string, duration?: number) {
    if (!duration) {
      duration = this._standardDuration;
    }
    this.addNotification({ id: this._currentId++, text: text, duration: duration, type: 2 });
  }
}