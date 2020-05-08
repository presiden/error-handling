import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Doc } from "../models/document.model";
import { DocFilter } from "../models/document-filter.model";
import { QueryLa } from '../models/query.model';
import { LifeAsiaDocument } from '../models/lifeasia-document.model';
import { DocumentService } from '../services/document.service';
import { UserService } from '../services/user.service';
import { NgbDateStruct, NgbDatepicker, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  model: Date;
  modelFrom: Date;
  modelTo: Date;
  doc: Doc;
  docFilter: DocFilter;
  queryLa: QueryLa
  docLa: LifeAsiaDocument;

  // modeldate: NgbDateStruct;
  // date: { year: number, month: number };
  // @ViewChild('dp') dp: NgbDatepicker;

  constructor(private http: HttpClient, private docService: DocumentService, private calendar: NgbCalendar) { }

  ngOnInit(): void {
  }

  // selectToday() {
  //   this.modeldate = this.calendar.getToday();
  // }

  // setCurrent() {
  //   //Current Date
  //   this.dp.navigateTo()
  // }
  // setDate() {
  //   //Set specific date
  //   this.dp.navigateTo({ year: 2013, month: 2 });
  // }

  // navigateEvent(event) {
  //   this.date = event.next;
  // }

  getDocument(startDate: any, endDate: any, type: any) {
    this.docFilter = new DocFilter();
    this.docFilter.startDate = startDate;
    this.docFilter.endDate = endDate;
    this.docFilter.type = type == 1 ? "PruCare" : 2 ? "Eventing" : 3 ? "SME" : "";

    this.docService.getDocument(this.docFilter).subscribe((res: any) => {
      this.docFilter.listDocument = res;
      console.log("getDocument:");
      console.log(res);

      if (res.length > 0) {

      } else {

      }
    });

    // console.log("di luar:" + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + ":" + new Date().getMilliseconds());
    // console.log(this.docFilter);

  }

  public getDocumentById(id: any) {
    this.doc = new Doc();

    this.docService.getDocumentById(id).subscribe((res: any) => {
      this.doc = res;
      console.log("getDocumentById:");
      console.log(res);
    });
  }

  public updateDocument(input: Doc) {

    this.docService.updateDocument(input).subscribe((res: any) => {
      this.doc = res;
      console.log("updateDocument:");
      console.log(res);

      if (res == true) {

      } else {

      }

    });
  }

  public pushErrToKafka(id: any, startDate: any, endDate: any, type: any) {
    this.docFilter = new DocFilter();
    this.docFilter.id = id;
    this.docFilter.startDate = startDate;
    this.docFilter.endDate = endDate;
    this.docFilter.type = type == 1 ? "PruCare" : 2 ? "Eventing" : 3 ? "SME" : "";

    this.docService.pushErrToKafka(this.docFilter).subscribe((res: any) => {
      this.doc = res;
      console.log("pushErrToKafka:");
      console.log(res);
    });
  }

  public queryLifeAsia(query: String, tableName: String) {
    this.queryLa = new QueryLa();
    this.queryLa.query = query;
    this.queryLa.tableName = tableName;

    this.docService.queryLifeAsia(this.queryLa).subscribe((res: any) => {
      this.doc = res;
      console.log("queryLifeAsia:");
      console.log(res);
    });
  }

  public pushLaToKafka(input: LifeAsiaDocument) {
    this.docLa = new LifeAsiaDocument();

    this.docService.pushLaToKafka(this.docLa).subscribe((res: any) => {
      this.doc = res;
      console.log("pushLaToKafka:");
      console.log(res);
    });
  }

}
