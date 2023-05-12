import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get(query?: any, sort?: any, select?: any): Observable<any[]> {

    let params = new HttpParams();

    if (query) {
      params = params.set("query", JSON.stringify(query))
    }

    if (sort) {
      params = params.set("sort", JSON.stringify(sort))
    }

    if (select) {
      params = params.set("select", JSON.stringify(select))
    }


    return this.http.get<any[]>('/api/user', { params: params } )
  }

  post(user: any): Observable<any> {
    return this.http.post<any>('/api/user', user)
  }

  patch(user: any, _id: string): Observable<any> {
    return this.http.patch<any>(`/api/user/${_id}`, user)
  }

  delete(_id: string): Observable<any> {
    return this.http.delete<any>(`/api/user/${_id}`)
  }

}
