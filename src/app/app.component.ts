// app.component.ts:
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./pages/doctor-dashboard/navbar/navbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, NavbarComponent]
})
export class AppComponent {
  title = 'Frontend';
}
