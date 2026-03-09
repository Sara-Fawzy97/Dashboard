import { Component,Input ,signal,computed} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 
  // parent passes down a shared signal
  @Input() isSidebarOpen= signal(false);

// ngOnInit(){

//  if(typeof window !== 'undefined'){
//    this.isMobile.set(window.innerWidth < 768);

//     window.addEventListener('resize', () => {
//       this.isMobile.set(window.innerWidth < 768);
//     });

//  }

// }
}
