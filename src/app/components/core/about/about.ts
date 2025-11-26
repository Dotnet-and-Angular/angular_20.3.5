import { Component, signal, effect } from '@angular/core';
import { GLOBAL_MESSAGES } from '../../../constants/global-messages';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class About {
  // live stats using signals
  users = signal(0);
  active = signal(0);
  errors = signal(0);
  labels = GLOBAL_MESSAGES.ABOUT;

  constructor() {
    // animate to target values
    this.animate(this.users, 120, 800);
    this.animate(this.active, 98, 900);
    this.animate(this.errors, 2, 1200);
  }

  private animate(sig: any, to: number, duration = 1000) {
    const start = Date.now();
    const from = sig();
    const step = () => {
      const t = Math.min(1, (Date.now() - start) / duration);
      const v = Math.round(from + (to - from) * t);
      sig.set(v);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
