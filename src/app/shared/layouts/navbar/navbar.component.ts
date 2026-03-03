import { Component ,signal,computed} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    isSidebarOpen = signal(false);

  get isMobile() {
    return window.innerWidth < 768;
  }
}
