import { Component, OnInit } from '@angular/core';
import { QueryLa } from '../models/query.model';
import { DocumentService } from '../services/document.service';
import { Doc } from "../models/document.model";
import { LifeAsiaDocument } from '../models/lifeasia-document.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  doc: Doc = new Doc();
  queryLa: QueryLa;
  docLa: LifeAsiaDocument;

  constructor(private docService: DocumentService) {
    this.queryLa = new QueryLa();
    this.queryLa.tableName = "";
    this.queryLa.clause = "";
    this.queryLa.query = "select * from [input table name] where [input filter]";
  }

  ngOnInit(): void {
  }

  onKeyup(event: KeyboardEvent) {
    let tblname = this.queryLa.tableName == "" ? "[input table name]" : this.queryLa.tableName;
    let clause = this.queryLa.clause == "" ? "[input filter]" : this.queryLa.clause;

    this.queryLa.query = "select * from " + tblname + " where " + clause;
  }

  public queryLifeAsia() {
    let stringQuery: String = JSON.stringify(this.queryLa);

    console.log("this.queryLa:");
    console.log(this.queryLa);

    console.log("stringQuery:");
    console.log(stringQuery);

    this.docService.queryLifeAsia(stringQuery).subscribe((res: any) => {
      this.doc = res;
      console.log("queryLifeAsia:");
      console.log(res);
    });
  }

  public pushLaToKafka() {
    let stringQuery: String = JSON.stringify(this.queryLa.documentLa);

    console.log("this.queryLa.documentLa:");
    console.log(this.queryLa.documentLa);

    console.log("stringQuery:");
    console.log(stringQuery);

    this.docService.pushLaToKafka(stringQuery).subscribe((res: any) => {
      this.doc = res;
      console.log("pushLaToKafka:");
      console.log(res);
    });
  }

}
