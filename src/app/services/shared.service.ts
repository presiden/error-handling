import { Injectable } from '@angular/core';
import { Doc } from '../models/document.model';
import { DocFilter } from '../models/document-filter.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
<<<<<<< HEAD
  doc: Doc;
=======
  doc: Doc = new Doc();
>>>>>>> 627a1e6bfea3cf0aebbe593c76c73d01d39d1405
  docFilter: DocFilter = { id: null, startDate: null, endDate: null, type: "PruCare", listDocument: null };

  constructor() { }

  // public setDetail(docFilter: DocFilter, id: String) {
  //   this.docFilter = docFilter;
  //   this.doc = this.docFilter.listDocument.find(i => i.id == id);
  //   console.log("setDetail:");
  //   console.log(this.docFilter);
  // }

  public setDetail(docFilter: DocFilter, doc: Doc) {
    // this.doc = this.docFilter.listDocument.find(i => i.id == id);
    this.docFilter = docFilter;
    this.doc = doc;
  }

  public getDetail(): Doc {
    return this.doc;
  }
}