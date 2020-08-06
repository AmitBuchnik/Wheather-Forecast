import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() style: string;
  @Input() header: string;
  @Input() subheader: string;

  constructor() { }

  ngOnInit(): void {
  }

}
