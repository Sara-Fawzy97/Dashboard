import { Component, signal,computed, Input } from '@angular/core';
import { RouterLink ,Router,RouterModule} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Input()  isSidebarOpen = signal(false);
    isMobile = signal(false);

ngOnInit(){

 if(typeof window !== 'undefined'){
   this.isMobile.set(window.innerWidth < 768);

    window.addEventListener('resize', () => {
      this.isMobile.set(window.innerWidth < 768);
    });

 }

}
}
