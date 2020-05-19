import { Component, OnInit } from '@angular/core';
import { Doc } from "../models/document.model";
import { DocFilter } from "../models/document-filter.model";
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { DocumentService } from '../services/document.service';
import { SharedService } from '../services/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  docFilter: DocFilter = new DocFilter();
  docOld: Doc = new Doc();
  doc: Doc = new Doc();
  previousUrl: string;

  constructor(private docService: DocumentService, private dataRoute: ActivatedRoute, private router: Router, private location: Location, private documentService: DocumentService, private sharedService: SharedService) {
  
    this.docFilter = this.sharedService.docFilter;

    this.doc.doc = this.sharedService.doc.doc;
    this.doc.error = this.sharedService.doc.error;
    this.doc.error_message = this.sharedService.doc.error_message;
    this.doc.id = this.sharedService.doc.id;
    this.doc.meta_id = this.sharedService.doc.meta_id;
    this.doc.src_table_name = this.sharedService.doc.src_table_name;
    this.doc.state = this.sharedService.doc.state;
    this.doc.status = this.sharedService.doc.status;
    this.doc.timestamps = this.sharedService.doc.timestamps;
    this.doc.type = this.sharedService.doc.type;
  }

  ngOnInit(): void {
  }

  public editDetail() {
    this.doc = this.sharedService.getDetail();
    console.log("EditComponent.displayDetail:");
    console.log(this.doc);    
  }

  public cancel() {
    this.router.navigateByUrl("/home");
  }

  public save(form) {
    this.docFilter.listDocument.find(i => i.id == this.doc.id).doc = this.doc.doc;
    this.docFilter.listDocument.find(i => i.id == this.doc.id).error = this.doc.error;
    this.docFilter.listDocument.find(i => i.id == this.doc.id).error_message = this.doc.error_message;
    this.docFilter.listDocument.find(i => i.id == this.doc.id).id = this.doc.id;
    this.docFilter.listDocument.find(i => i.id == this.doc.id).meta_id = this.doc.meta_id;
    this.docFilter.listDocument.find(i => i.id == this.doc.id).src_table_name = this.doc.src_table_name;
    this.docFilter.listDocument.find(i => i.id == this.doc.id).state = this.doc.state;
    this.docFilter.listDocument.find(i => i.id == this.doc.id).status = this.doc.status;
    this.docFilter.listDocument.find(i => i.id == this.doc.id).timestamps = this.doc.timestamps;
    this.docFilter.listDocument.find(i => i.id == this.doc.id).type = this.doc.type;
    // this.sharedService.saveDetail(this.docFilter);
    this.router.navigateByUrl("/home");
  }

}
