import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Observable } from 'rxjs';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],

  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateX(30px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 10, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class ChatsComponent implements OnInit {

  chats$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {

    this.data.getChats(this.data.currentUserId).subscribe(
      data => this.chats$ = data
    );
  }

  getCurrentUser() {

  }
}
