import { Component, Input, OnInit } from '@angular/core';
import { Subscriber } from '../subscriber';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.subscriber = new Subscriber(this.username,this.username,this.plan,new Date(),this.validity);
    console.log(this.subscriber);
    alert("Subscribed!")
    this.router.navigate(["../dashboard"])
  }
}
