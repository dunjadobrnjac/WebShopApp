import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { CommentsService } from './comments.service';
import { CommentComponent } from '../comment/comment.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    CommentsComponent,
    CommentComponent,
    CommentFormComponent,
  ],
  imports: [
    CommonModule, ReactiveFormsModule, 
    MatFormFieldModule, FormsModule, MatInputModule
  ],
  exports: [
    CommentsComponent
  ],
  providers: [
    CommentsService
  ]
})
export class CommentsModule { }
