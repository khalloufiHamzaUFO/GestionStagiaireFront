import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { candidat } from './candidat/candidat.component';

@Injectable({
  providedIn: 'root'
})
export class CandidatServiceService {
  url: string;

  constructor(private httpC:HttpClient) {
    this.url="http://localhost:8089/candidats";
   }

public GetCandidat():Observable<any>{
  let endPoints = "/showList"
    return this.httpC.get<any>(this.url + endPoints)
}
public newCandidat(candidat:candidat):Observable<any>{
  let endPoints = "/showList/ajoutCandidat"
    return this.httpC.post<any>(this.url + endPoints,candidat)
}
public modifierCandidat(candidat:candidat,id:number):Observable<any>{
  let endPoints = '/showList/'+id+'/modifier'
    return this.httpC.put<any>(this.url + endPoints,candidat)
}
public deleteCandidat(id:number):Observable<any>{
  let endPoints = '/showList/'+id+'/supprimer'
  return this.httpC.delete<any>(this.url + endPoints,)

  }
}

