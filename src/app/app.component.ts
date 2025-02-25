// app.component.ts:
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ RouterOutlet]
})
export class AppComponent {
  title = 'Frontend';
}
