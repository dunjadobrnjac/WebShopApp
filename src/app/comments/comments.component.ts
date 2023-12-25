import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { UserService } from '../services/user.service';
import { RegistrationService } from '../services/registration.service';
import { User } from '../interface/interfaces';


export interface CommentInterface {
  id: string;
  itemId: number,
  body: string;
  username: string;
  userId: string;
  parentId: string | null;
  createdAt: string;
}


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  currentUserId!: string;
  username!: string;
  image!: string;
  @Input() itemId!: string;

  comments: CommentInterface[] = []; //cuva dobavljene komentare
  activeComment: CommentInterface | null = null; //koji komentar je aktivan zbog prikaza input polja za reply

  constructor(private commentsService: CommentsService,
    private userService: UserService,
    private registrationService: RegistrationService) { }

  ngOnInit(): void {
    //privjera d ali je logovan kako bi mu se o(ne)mogucilo komentarisanje
    this.registrationService.isLoggedIn.subscribe(
      response => {
        if (response) {
          const ls = localStorage.getItem("activeUserId");
          console.log("ls " + ls);
          const activeUserId = ls != null ? parseInt(ls, 10) : 0;
          this.userService.getUserById(activeUserId).subscribe(
            user => {
              this.currentUserId = user.id;
              this.username = user.username;
            }
          );
        }
      }
    );

    this.commentsService.getComments().subscribe(comments => {
      let filtered = comments.filter(c => c.itemId == parseInt(this.itemId)); 
      this.comments = filtered;
    })
    console.log("id -->" + this.currentUserId);
  }

  addComment({ text, parentId }: { text: string; parentId: string | null; }): void {
    console.log('addComment', text, parentId);
    this.commentsService
      .createComment(text, parentId, this.username, this.currentUserId, parseInt(this.itemId))
      .subscribe((createdComment) => {
        this.comments = [...this.comments, createdComment]; //dodavanje komentara u listu komentara
        this.activeComment = null; //da se skloni forma nakon dodavanja odgovora
      });
  }

  deleteComment(commentId: string): void {
    this.commentsService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(
        (comment) => comment.id !== commentId
      );
    });
  }

  getReplies(commentId: string): CommentInterface[] {
    return this.comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }

  setActiveComment(activeComment: CommentInterface): void {
    this.activeComment = activeComment;
  }
}
