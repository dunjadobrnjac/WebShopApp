import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';


export interface CommentInterface {
  id: string;
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

  @Input() currentUserId!: string;

  comments: CommentInterface[] = []; //cuva dobavljene komentare
  activeComment: CommentInterface | null = null; //koji komentar je aktivan zbog prikaza input polja za reply

  constructor(private commentsService: CommentsService) { }
  ngOnInit(): void {
    this.commentsService.getComments().subscribe(comments => {
      this.comments = comments;
    })
  }

  addComment({ text, parentId }: { text: string; parentId: string | null; }): void {
    console.log('addComment', text, parentId);
    this.commentsService
      .createComment(text, parentId)
      .subscribe((createdComment) => {
        this.comments = [...this.comments, createdComment]; //dodavanje komentara u nasu listu komentara
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
