import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Doc } from "../models/document.model";
import { DocFilter } from "../models/document-filter.model";

import { DocumentService } from '../services/document.service';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbDatepicker, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';

// enum docType { PruCare = 1, Eventing = 2, SME = 3 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modelFrom: NgbDate;// = new NgbDate(2020,10,17);
  modelTo: NgbDate;
  doc: Doc = new Doc();
  docFilter: DocFilter;
  
  types: Array<Object> = [
    { value: 0, name: "PruCare" },
    { value: 1, name: "Eventing" },
    { value: 2, name: "SME" }
  ];

  constructor(private http: HttpClient, private router: Router, private docService: DocumentService, private sharedService: SharedService) {

    this.docFilter = this.sharedService.docFilter;
    console.log("this.docFilter:");
    console.log(this.docFilter);
  }

  ngOnInit(): void {
  }

  public editDetail(id: String) {
    this.sharedService.setDetail(this.docFilter, id);
    this.router.navigateByUrl("/edit");
  }

  public getEdit(docFilter: DocFilter) {
    this.docFilter = docFilter;
  }

  getDocument(startDate: any, endDate: any, doctype: any) {
    this.docFilter = new DocFilter();
    this.docFilter.startDate = startDate;
    this.docFilter.endDate = endDate;
    this.docFilter.type = doctype;
    // this.docFilter.type = type == 1 ? "PruCare" : 2 ? "Eventing" : 3 ? "SME" : "";

    console.log("this.docFilter:");
    console.log(this.docFilter);
    this.docService.getDocument(this.docFilter).subscribe((res: any) => {
      this.docFilter.listDocument = res;

      console.log("getDocument:");
      console.log(res);

      if (!res) {
        console.log("No data found");
      }
    });


  }

  public getDocumentById(id: any) {
    this.doc = new Doc();

    this.docService.getDocumentById(id).subscribe((res: any) => {
      this.doc = res;
      console.log("getDocumentById:");
      console.log(res);
    });
  }

  public updateDocument(input: any) {

    this.docService.updateDocument(input).subscribe((res: any) => {
      this.doc = res;
      console.log("updateDocument:");
      console.log(res);

      if (res == true) {

      } else {

      }

    });
  }

  public pushErrToKafka(id: any, startDate: any, endDate: any, doctype: any) {
    this.docFilter = new DocFilter();
    this.docFilter.id = id;
    this.docFilter.startDate = startDate;
    this.docFilter.endDate = endDate;
    this.docFilter.type = doctype;

    this.docService.pushErrToKafka(this.docFilter).subscribe((res: any) => {
      this.doc = res;
      console.log("pushErrToKafka:");
      console.log(res);
    });
  }

  

}
