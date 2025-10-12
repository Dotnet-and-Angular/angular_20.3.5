import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-main',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
