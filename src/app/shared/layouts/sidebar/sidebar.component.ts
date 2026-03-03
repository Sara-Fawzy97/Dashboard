import { Component, signal,computed } from '@angular/core';
import { RouterLink ,Router,RouterModule} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

    isSidebarOpen = signal(false);

  get isMobile() {
    return window.innerWidth < 768;
  }
  
}
