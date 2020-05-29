import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Doc } from "../models/document.model";
import { DocFilter } from "../models/document-filter.model";

import { DocumentService } from '../services/document.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ["id", "src_table_name", "error_message", "type", "status", "state", "timestamps", "action"];
  dataSource: MatTableDataSource<Doc>;

  types: Array<Object> = [
    { value: 0, name: "PruCare" },
    { value: 1, name: "Eventing" },
    { value: 2, name: "SME" }
  ];

  constructor(private http: HttpClient, private router: Router, private docService: DocumentService, private sharedService: SharedService) {

    console.log("localStorage:");
    console.log(localStorage);
    if (!localStorage.getItem("isLoggedIn")) {
      this.router.navigateByUrl("");
      return;
    }

    this.docFilter = this.sharedService.docFilter;
    this.modelFrom = this.docFilter.startDate == null ? null : this.setDate(this.docFilter.startDate);
    this.modelTo = this.docFilter.endDate == null ? null : this.setDate(this.docFilter.endDate);
    this.dataSource = new MatTableDataSource();

    console.log("this.docFilter:");
    console.log(this.docFilter);
  }

  ngAfterViewChecked() {
    const list = document.getElementsByClassName('mat-paginator-range-label');
    let jumlah = Math.ceil(this.paginator.length / this.paginator.pageSize);
    jumlah = jumlah == 0 ? 1 : jumlah;
    list[0].innerHTML = 'Page: ' + (this.paginator.pageIndex + 1).toString() + " of " + jumlah;
  }

  ngAfterViewInit() {
    if (this.docFilter.listDocument != null) {
      this.dataSource = new MatTableDataSource(this.docFilter.listDocument);
      this.paginator.pageSize = 10;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  tes() {
    console.log("this.paginator:");
    console.log(this.paginator);
  }

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

    // console.log("this.modelFrom:");
    // console.log(this.modelFrom);

    if (this.docFilter.startDate == "" || this.docFilter.endDate == "") {
      alert("start date and end date must not empty");
    } else if (this.docFilter.startDate > this.docFilter.endDate) {
      alert("start date is higher than end date");
    } else {
      this.docService.getDocument(this.docFilter).subscribe((res: any) => {

        this.docFilter.listDocument = res;

        this.dataSource = new MatTableDataSource(this.docFilter.listDocument);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

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
    this.docFilter.startDate = this.modelFrom == null ? "" : this.modelFrom.year + "-" + String(this.modelFrom.month).padStart(2, '0') + "-" + String(this.modelFrom.day).padStart(2, '0');
    this.docFilter.endDate = this.modelTo == null ? "" : this.modelTo.year + "-" + String(this.modelTo.month).padStart(2, '0') + "-" + String(this.modelTo.day).padStart(2, '0');

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
