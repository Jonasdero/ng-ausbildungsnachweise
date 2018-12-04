import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-200%)' }),
        animate('300ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(200%)' }))
      ])
    ])
  ]

})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() notification: NotificationContent;
  @Output() finished: EventEmitter<NotificationContent> = new EventEmitter();
  interval: any;
  progressbarvalue: number = 0;

  constructor() { }

  ngOnInit() {
    if (!this.notification.currentDuration)
      this.notification.currentDuration = 0;
    this.startTimer();
  }

  getBackgroundColor(): string {
    switch (this.notification.type) {
      case 0: // Info (green)
        return "#4caf50";
      case 1: // Warning (yellow/orange)
        return "#ffeb3b";
      case 2: // Error (red)
        return "#f44336";
      default: // return blue
        return "#29b6f6";
    }
  }
  getColor(): string {
    if (this.notification.type === 1)
      return 'black';
    return 'white'
  }
  startTimer() {
    this.interval = setInterval(() => {
      this.notification.currentDuration++;
      this.progressbarvalue = Math.round(this.notification.currentDuration / this.notification.duration * 100);
      if (this.notification.currentDuration >= this.notification.duration) {
        this.notification.currentDuration = this.notification.duration;
        if (this)
          this.ngOnDestroy();
        setTimeout(() => this.finished.emit(this.notification), 1000);
      }
    }, 1000)
  }

  close() {
    if (this)
      this.ngOnDestroy();
    this.notification.currentDuration = this.notification.duration;
    setTimeout(() => this.finished.emit(this.notification), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}