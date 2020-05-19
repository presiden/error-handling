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

  constructor(private docService: DocumentService) { }

  ngOnInit(): void {
  }

  // public queryLifeAsia(query: String, tableName: String) {
  public queryLifeAsia() {
    let query: String;
    let tableName: String;

    this.queryLa = new QueryLa();
    this.queryLa.query = query;
    this.queryLa.tableName = tableName;

    // this.docService.queryLifeAsia(this.queryLa).subscribe((res: any) => {
    this.docService.queryLifeAsia().subscribe((res: any) => {
      this.doc = res;
      console.log("queryLifeAsia:");
      console.log(res);
    });
  }

  // public pushLaToKafka(input: LifeAsiaDocument) {
  public pushLaToKafka() {
    let input: LifeAsiaDocument;
    this.docLa = new LifeAsiaDocument();

    // this.docService.pushLaToKafka(this.docLa).subscribe((res: any) => {
    this.docService.pushLaToKafka().subscribe((res: any) => {
      this.doc = res;
      console.log("pushLaToKafka:");
      console.log(res);
    });
  }

}
