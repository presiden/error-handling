import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Doc } from "../models/document.model";
import { DocFilter } from "../models/document-filter.model";

import { DocumentService } from '../services/document.service';
<<<<<<< HEAD
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
=======
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbDatepicker, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
>>>>>>> 627a1e6bfea3cf0aebbe593c76c73d01d39d1405
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

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
  docFilter: DocFilter;
<<<<<<< HEAD
  faCalendar = faCalendar;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ["id", "src_table_name", "error_message", "type", "status", "state", "timestamps", "action"];
  dataSource: MatTableDataSource<Doc>;
=======
>>>>>>> 627a1e6bfea3cf0aebbe593c76c73d01d39d1405

  types: Array<Object> = [
    { value: 0, name: "PruCare" },
    { value: 1, name: "Eventing" },
    { value: 2, name: "SME" }
  ];

  constructor(private http: HttpClient, private router: Router, private docService: DocumentService, private sharedService: SharedService) {
<<<<<<< HEAD

    console.log("localStorage:");
    console.log(localStorage);
    if (!localStorage.getItem("isLoggedIn")) {
      this.router.navigateByUrl("");
      return;
    }

    this.docFilter = this.sharedService.docFilter;
    this.modelFrom = this.docFilter.startDate == null ? null : this.setDate(this.docFilter.startDate);
    this.modelTo = this.docFilter.endDate == null ? null : this.setDate(this.docFilter.endDate);

    this.dataSource = new MatTableDataSource(this.docFilter.listDocument);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

=======
    this.docFilter = this.sharedService.docFilter;

    this.modelFrom = this.docFilter.startDate == null ? null : this.setDate(this.docFilter.startDate);
    this.modelTo = this.docFilter.endDate == null ? null : this.setDate(this.docFilter.endDate);

>>>>>>> 627a1e6bfea3cf0aebbe593c76c73d01d39d1405
    console.log("this.docFilter:");
    console.log(this.docFilter);
  }

<<<<<<< HEAD
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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

  // public editDetail(id: String) {
  //   this.docFilter.startDate = this.modelFrom == null ? "" : this.modelFrom.year + "-" + String(this.modelFrom.month).padStart(2, '0') + "-" + String(this.modelFrom.day).padStart(2, '0');
  //   this.docFilter.endDate = this.modelTo == null ? "" : this.modelTo.year + "-" + String(this.modelTo.month).padStart(2, '0') + "-" + String(this.modelTo.day).padStart(2, '0');

  //   this.sharedService.setDetail(this.docFilter, id);
  //   this.router.navigateByUrl("/edit");
  // }

  getDocument(startDate: any, endDate: any, doctype: any) {
    this.docFilter.startDate = this.modelFrom == null ? "" : this.modelFrom.year + "-" + String(this.modelFrom.month).padStart(2, '0') + "-" + String(this.modelFrom.day).padStart(2, '0');
    this.docFilter.endDate = this.modelTo == null ? "" : this.modelTo.year + "-" + String(this.modelTo.month).padStart(2, '0') + "-" + String(this.modelTo.day).padStart(2, '0');
=======
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
>>>>>>> 627a1e6bfea3cf0aebbe593c76c73d01d39d1405

    // console.log("this.modelFrom:");
    // console.log(this.modelFrom);

    if (this.docFilter.startDate == "" || this.docFilter.endDate == "") {
      alert("start date and end date must not empty");
    } else if (this.docFilter.startDate > this.docFilter.endDate) {
      alert("start date is higher than end date");
    } else {
      this.docService.getDocument(this.docFilter).subscribe((res: any) => {
        this.docFilter.listDocument = res;

<<<<<<< HEAD
        this.dataSource = new MatTableDataSource(this.docFilter.listDocument);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

=======
>>>>>>> 627a1e6bfea3cf0aebbe593c76c73d01d39d1405
        console.log("getDocument:");
        console.log(res);

        if (!res) {
          console.log("No data found");
        }
      });
    }
  }

  public getDocumentById(id: String) {
    this.docFilter.startDate = this.modelFrom == null ? "" : this.modelFrom.year + "-" + String(this.modelFrom.month).padStart(2, '0') + "-" + String(this.modelFrom.day).padStart(2, '0');
    this.docFilter.endDate = this.modelTo == null ? "" : this.modelTo.year + "-" + String(this.modelTo.month).padStart(2, '0') + "-" + String(this.modelTo.day).padStart(2, '0');

    this.docService.getDocumentById(id).subscribe((res: any) => {
      this.doc = res;
      console.log("getDocumentById:");
      console.log(res);

      this.sharedService.setDetail(this.docFilter, this.doc);
      this.router.navigateByUrl("/edit");
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
<<<<<<< HEAD
    this.docFilter.startDate = this.modelFrom == null ? "" : this.modelFrom.year + "-" + String(this.modelFrom.month).padStart(2, '0') + "-" + String(this.modelFrom.day).padStart(2, '0');
    this.docFilter.endDate = this.modelTo == null ? "" : this.modelTo.year + "-" + String(this.modelTo.month).padStart(2, '0') + "-" + String(this.modelTo.day).padStart(2, '0');
=======
    this.docFilter.startDate = this.modelFrom == null ? "" : this.modelFrom.year + "-" + this.modelFrom.month + "-" + this.modelFrom.day;
    this.docFilter.endDate = this.modelTo == null ? "" : this.modelTo.year + "-" + this.modelTo.month + "-" + this.modelTo.day;
>>>>>>> 627a1e6bfea3cf0aebbe593c76c73d01d39d1405

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
<<<<<<< HEAD
}
=======
}
>>>>>>> 627a1e6bfea3cf0aebbe593c76c73d01d39d1405
