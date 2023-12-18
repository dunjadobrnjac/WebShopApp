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
    parentId: string | null = null,
    username: string,
    userId: string,
    itemId: number
  ): Observable<CommentInterface> {
    return this.httpClient.post<CommentInterface>(
      'http://localhost:3000/comments',
      {
        itemId: itemId, //id oglasa za koji se kreira komentar
        body: text, //tekst komentara
        parentId, //id komentara ako je odgovor, null ako je prvi niz komentara
        createdAt: new Date().toISOString(),
        userId: userId, //id aktivnog korisnika i njegov username
        username: username,
      }
    );
  }

  deleteComment(id: string): Observable<{}> {
    return this.httpClient.delete(`http://localhost:3000/comments/${id}`);
  }
}

