import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nav-button',
  templateUrl: 'nav-button.component.html',
  styleUrls: ['nav-button.component.scss']
})
export class NavButtonComponent implements OnInit {
  @Input() path: string = '';
  @Input() name: string = '';
  @Input() textCondition: boolean = true;
  @Input() icon: string = '';
  @Input() iconCondition: boolean = true;

  @Output() clicked = new EventEmitter<any>();

  constructor() { }
  navigate(path: string) {
    // this.router.navigate([path]);
    this.clicked.emit();
  }
  ngOnInit() { }
}