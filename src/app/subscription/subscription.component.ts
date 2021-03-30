import { Component, Input, OnInit } from '@angular/core';
import { Subscriber } from '../subscriber';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  @Input() username: string;
  plan: string;
  validity: string;
  subscriber: Subscriber;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.subscriber = new Subscriber(this.username,this.username,this.plan,new Date(),this.validity);
    console.log(this.subscriber);
  }
}
