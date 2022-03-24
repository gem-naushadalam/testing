import { Component, OnInit } from '@angular/core';
import { Input, HostListener } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ToggleBtnService } from 'src/app/services/toggle-btn/toggle-btn.service';

@Component({
  selector: 'app-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.scss'],
})
export class SidebarToggleComponent implements OnInit {
  constructor(private toggleBtn: ToggleBtnService) {}
  ngOnInit(): void {}

  @HostListener('click')
  click() {
    this.toggleBtn.toggle();
  }
}
