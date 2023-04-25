import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZipCodeResponse } from '../response/zip-code.response';

@Injectable({
  providedIn: 'root'
})
export class SearchZipCodeService {

  constructor(private http: HttpClient) { }

  searchCepService(zipCode: any) {
    let url = `https://api.postmon.com.br/v1/cep/${zipCode}`
    let zipCodeResponse = this.http.get<ZipCodeResponse>(url)
    return zipCodeResponse;
  }
}
