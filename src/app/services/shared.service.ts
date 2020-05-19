import { Injectable } from '@angular/core';
import { Doc } from '../models/document.model';
import { DocFilter } from '../models/document-filter.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  doc: Doc = new Doc();
  docFilter: DocFilter = { id: null, startDate: null, endDate:null, type:"0", listDocument: null };

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

  // public updateDetail(docFilter: DocFilter, doc: Doc){
  //   this.docFilter = docFilter;
  //   this.docFilter.listDocument.find(i => i.id == doc.id).doc = doc.doc;
  //   this.docFilter.listDocument.find(i => i.id == doc.id).error = doc.error;
  //   this.docFilter.listDocument.find(i => i.id == doc.id).error_message = doc.error_message;
  //   this.docFilter.listDocument.find(i => i.id == doc.id).id = doc.id;
  //   this.docFilter.listDocument.find(i => i.id == doc.id).meta_id = doc.meta_id;
  //   this.docFilter.listDocument.find(i => i.id == doc.id).src_table_name = doc.src_table_name;
  //   this.docFilter.listDocument.find(i => i.id == doc.id).state = doc.state;
  //   this.docFilter.listDocument.find(i => i.id == doc.id).status = doc.status;
  //   this.docFilter.listDocument.find(i => i.id == doc.id).timestamps = doc.timestamps;
  //   this.docFilter.listDocument.find(i => i.id == doc.id).type = doc.type;

  //   console.log("updateDetail:");
  //   console.log(this.docFilter);
  // }

  // public cancelDetail(docFilter: DocFilter){
  //   this.docFilter = docFilter;
  //   console.log("cancelDetail:");
  //   console.log(this.docFilter);
  // }
  // public saveDetail(docFilter: DocFilter){
  //   this.docFilter = docFilter;
  //   console.log("cancelDetail:");
  //   console.log(this.docFilter);
  // }
}