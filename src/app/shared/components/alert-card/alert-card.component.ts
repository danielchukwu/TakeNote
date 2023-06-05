import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert-card',
  templateUrl: './alert-card.component.html',
  styleUrls: ['./alert-card.component.css']
})
export class AlertCardComponent implements OnInit, OnDestroy {
  @Input() title: String = 'Successful';
  @Input() isSuccess: boolean = true;
  showAlert: boolean = false;

  sub1$: Subscription | undefined;

  constructor(
    private dataSharingService: DataSharingService
  ){}
  ngOnInit(): void {
    this.sub1$ = this.dataSharingService.getAlert().subscribe((data) => {
      this.title = data.title;
      this.isSuccess = data.isSuccess;
      this.showAlert = data.showAlert;

      // Set timeout to close alert card
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    })
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  
}
