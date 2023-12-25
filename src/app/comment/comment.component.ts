import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentInterface } from '../comments/comments.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() currentUserId!: string;
  @Input() comment!: CommentInterface;
  @Input() replies!: CommentInterface[]; //ako komentar ima odgovore

  //createdAt: string = '';
  canReply: boolean = false;
  canDelete: boolean = false;
  image!: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.canReply = Boolean(this.currentUserId); //ako je null ili undefined vratice false, inace vraca true (neprijavljeni korisnici ne mogu odgovoriti na komentar)
    this.canDelete =
      this.currentUserId === this.comment.userId &&
      this.replies.length === 0; //moze obrisati ako nema odgovora

    this.replyId = this.parentId ? this.parentId : this.comment.id;

    this.userService.getUserById(parseInt(this.comment.userId)).subscribe(
      response => {
        this.image = response.avatar;
      }
    );
  }

  //kada se klikne na reply taj komentar se postavi da je aktivan
  @Output()
  setActiveComment = new EventEmitter<CommentInterface>();

  @Input() activeComment!: CommentInterface | null;

  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment.id
    );
  }

  replyId: string | null = null;
  @Input() parentId: string | null = null;

  @Output() addComment = new EventEmitter<{ text: string; parentId: string | null }>();

  //za brisanje komentara
  @Output() deleteComment = new EventEmitter<string>();
}
