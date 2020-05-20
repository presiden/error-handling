import { Injectable } from '@angular/core';
import { Doc } from '../models/document.model';
import { DocFilter } from '../models/document-filter.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  doc: Doc = new Doc();
  docFilter: DocFilter = { id: null, startDate: null, endDate: null, type: "PruCare", listDocument: null };

  constructor() { }

  public setDetail(docFilter: DocFilter, id: String) {
    this.docFilter = docFilter;
    this.doc = this.docFilter.listDocument.find(i => i.id == id);
    console.log("setDetail:");
    console.log(this.docFilter);
  }

  public getDetail(): Doc {
    return this.doc;
  }
}