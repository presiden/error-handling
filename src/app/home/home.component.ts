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
  modelFrom: NgbDate;
  modelTo: NgbDate;
  doc: Doc = new Doc();
  docs: Doc[];
  docFilter: DocFilter;

  types: Array<Object> = [
    { value: 0, name: "PruCare" },
    { value: 1, name: "Eventing" },
    { value: 2, name: "SME" }
  ];

  constructor(private http: HttpClient, private router: Router, private docService: DocumentService, private sharedService: SharedService) {
    this.docFilter = this.sharedService.docFilter;

    this.modelFrom = this.docFilter.startDate == null ? null : this.setDate(this.docFilter.startDate);
    this.modelTo = this.docFilter.endDate == null ? null : this.setDate(this.docFilter.endDate);

    console.log("this.docFilter:");
    console.log(this.docFilter);
  }

  ngOnInit(): void {
  }

  private setDate(input: String) {
    input += "";
    let splitString: String[] = input.split("-");
    let year = +splitString[0];
    let month = +splitString[1];
    let day = +splitString[2];
    let output: NgbDate = new NgbDate(year, month, day);

    return output;
  }

  public editDetail(id: String) {
    this.docFilter.startDate = this.modelFrom == null ? "" : this.modelFrom.year + "-" + this.modelFrom.month + "-" + this.modelFrom.day;
    this.docFilter.endDate = this.modelTo == null ? "" : this.modelTo.year + "-" + this.modelTo.month + "-" + this.modelTo.day;

    this.sharedService.setDetail(this.docFilter, id);
    this.router.navigateByUrl("/edit");
  }

  getDocument(startDate: any, endDate: any, doctype: any) {
    this.docFilter.startDate = this.modelFrom == null ? "" : this.modelFrom.year + "-" + this.modelFrom.month + "-" + this.modelFrom.day;
    this.docFilter.endDate = this.modelTo == null ? "" : this.modelTo.year + "-" + this.modelTo.month + "-" + this.modelTo.day;

    // let dateFrom: Date = this.docFilter.startDate == "" ? null : new Date(this.docFilter.startDate);
    // let dateTo: Date = this.docFilter.endDate == "" ? null : new Date(this.docFilter.endDate);

    // console.log("this.modelFrom:");
    // console.log(this.modelFrom);

    if (this.docFilter.startDate == "" || this.docFilter.endDate == "") {
      alert("start date and end date must not empty");
    } else if (this.docFilter.startDate > this.docFilter.endDate) {
      alert("start date is higher than end date");
    } else {
      this.docService.getDocument(this.docFilter).subscribe((res: any) => {
        this.docFilter.listDocument = res;

        console.log("getDocument:");
        console.log(res);

        if (!res) {
          console.log("No data found");
        }
      });
    }
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

  // public pushErrToKafka(id: any, startDate: any, endDate: any, doctype: any) {
  public pushErrToKafka(id: any) {

    this.docFilter.id = id;
    this.docFilter.startDate = this.modelFrom == null ? "" : this.modelFrom.year + "-" + this.modelFrom.month + "-" + this.modelFrom.day;
    this.docFilter.endDate = this.modelTo == null ? "" : this.modelTo.year + "-" + this.modelTo.month + "-" + this.modelTo.day;

    let obj = {
      "id": this.docFilter.id,
      "startDate": this.docFilter.startDate,
      "endDate": this.docFilter.endDate
    };

    this.docService.pushErrToKafka(obj).subscribe((res: any) => {
      this.doc = res;
      console.log("pushErrToKafka:");
      console.log(res);
    });
  }
}
