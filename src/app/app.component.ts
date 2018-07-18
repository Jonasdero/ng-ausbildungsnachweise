import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  @ViewChild('sidenav') sidenav: MatSidenav;
  mini: boolean = true;
  mode: string = 'side';

  constructor(private breakpointObserver: BreakpointObserver) { }

  changeSize() {
    this.mini = !this.mini;
    setTimeout(() => {
      if (this.mini) this.mode = 'side';
      else this.mode = 'push';
    }, 20)
  }

  minify() { this.mini = true; setTimeout(() => { this.mode = 'side'; }, 20) }

  ngOnInit() {
    this.mini = false;
  }
}
