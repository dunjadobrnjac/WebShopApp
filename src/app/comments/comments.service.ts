import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentInterface } from './comments.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) { }

  getComments(): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>('http://localhost:3000/comments');
  }

  /*dodavanje unesenog komentara */
  createComment(
    text: string,
    parentId: string | null = null
  ): Observable<CommentInterface> {
    return this.httpClient.post<CommentInterface>(
      'http://localhost:3000/comments',
      {
        body: text,
        parentId,
        // Should not be set here, ovo treba biti na backendu
        createdAt: new Date().toISOString(),
        userId: '1', //id aktivnog korisnika i njegov username
        username: 'John',
      }
    );
  }

  deleteComment(id: string): Observable<{}> {
    return this.httpClient.delete(`http://localhost:3000/comments/${id}`);
  }
}

