import { Component, signal } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular_20.3.5');


  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart)
      )
      .subscribe((event: NavigationEvent) => {
        console.log('Navigation Started:', event);
      });
  }
}