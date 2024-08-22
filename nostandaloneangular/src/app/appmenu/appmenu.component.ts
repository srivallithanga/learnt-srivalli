import { Component } from '@angular/core';

interface MenuItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrl: './appmenu.component.css'
})
export class AppmenuComponent {
  menuItems: MenuItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Admin', path: '/admin' },
    { label: 'Add Product', path: '/addproduct' }
  ];

}
