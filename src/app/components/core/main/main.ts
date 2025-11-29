import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Footer } from '@core/components';

@Component({
  selector: 'app-main',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
