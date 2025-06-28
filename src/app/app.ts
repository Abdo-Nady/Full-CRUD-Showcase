import { Component } from '@angular/core';
import { ItemsListComponent } from './items-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemsListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  // 🔴 Remove title reference or add it:
  title = 'angular-list-app';
}
