import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private apiUrl = 'http://localhost:8082/api/reddit';

  constructor(private http: HttpClient) {}

  buscarPosts(query: string, after: string | null = null, limit: number = 5): Observable<any> {
  let url = `${this.apiUrl}?q=${encodeURIComponent(query)}&limit=${limit}`;
  if (after) url += `&after=${encodeURIComponent(after)}`;
  return this.http.get(url);
}
}
