import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Doc } from "../models/document.model";
import { DocFilter } from "../models/document-filter.model";
import { QueryLa } from '../models/query.model';
import { LifeAsiaDocument } from '../models/lifeasia-document.model';
var docType;
(function (docType) {
    docType[docType["PruCare"] = 1] = "PruCare";
    docType[docType["Eventing"] = 2] = "Eventing";
    docType[docType["SME"] = 3] = "SME";
})(docType || (docType = {}));
;
let HomeComponent = class HomeComponent {
    constructor(http, dataRoute, location, router, docService, sharedService) {
        this.http = http;
        this.dataRoute = dataRoute;
        this.location = location;
        this.router = router;
        this.docService = docService;
        this.sharedService = sharedService;
        this.doc = new Doc();
        this.docFilter = { id: null, startDate: null, endDate: null, type: "2", listDocument: null };
        this.types = [
            { value: 0, name: "PruCare" },
            { value: 1, name: "Eventing" },
            { value: 2, name: "SME" }
        ];
        // let d = JSON.parse(this.dataRoute.snapshot.params['datarow']);
        console.log("doc:");
        console.log(this.doc);
        this.docFilter = this.sharedService.docFilter;
    }
    ngOnInit() {
    }
    editDetail(id) {
        this.sharedService.setDetail(this.docFilter, id);
        this.router.navigateByUrl("/edit");
    }
    getEdit(docFilter) {
        this.docFilter = docFilter;
    }
    getDocument(startDate, endDate, doctype) {
        this.docFilter = new DocFilter();
        this.docFilter.startDate = startDate;
        this.docFilter.endDate = endDate;
        this.docFilter.type = docType[doctype];
        // this.docFilter.type = type == 1 ? "PruCare" : 2 ? "Eventing" : 3 ? "SME" : "";
        console.log("doctype:");
        console.log(doctype);
        this.docService.getDocument(this.docFilter).subscribe((res) => {
            this.docFilter.listDocument = res;
            // this.docs = res;
            console.log("getDocument:");
            console.log(res);
            this.doc = this.docFilter.listDocument[0];
            console.log("this.doc:");
            console.log(this.doc);
            if (!res) {
                console.log("No data found");
            }
        });
    }
    getDocumentById(id) {
        this.doc = new Doc();
        this.docService.getDocumentById(id).subscribe((res) => {
            this.doc = res;
            console.log("getDocumentById:");
            console.log(res);
        });
    }
    // public displayDetail(datarow: any) {
    //   // let detail = this.docFilter.listDocument.find(i => i.id == id);
    //   console.log("displayDetail:");
    //   console.log(datarow);
    //   this.router.navigate(["/edit", JSON.stringify(datarow)], { skipLocationChange: true }).then(result => {
    //     this.location.replaceState('/edit');
    //   });
    // }
    updateDocument(input) {
        this.docService.updateDocument(input).subscribe((res) => {
            this.doc = res;
            console.log("updateDocument:");
            console.log(res);
            if (res == true) {
            }
            else {
            }
        });
    }
    pushErrToKafka(id, startDate, endDate, type) {
        this.docFilter = new DocFilter();
        this.docFilter.id = id;
        this.docFilter.startDate = startDate;
        this.docFilter.endDate = endDate;
        this.docFilter.type = docType[type];
        this.docService.pushErrToKafka(this.docFilter).subscribe((res) => {
            this.doc = res;
            console.log("pushErrToKafka:");
            console.log(res);
        });
    }
    queryLifeAsia(query, tableName) {
        this.queryLa = new QueryLa();
        this.queryLa.query = query;
        this.queryLa.tableName = tableName;
        this.docService.queryLifeAsia(this.queryLa).subscribe((res) => {
            this.doc = res;
            console.log("queryLifeAsia:");
            console.log(res);
        });
    }
    pushLaToKafka(input) {
        this.docLa = new LifeAsiaDocument();
        this.docService.pushLaToKafka(this.docLa).subscribe((res) => {
            this.doc = res;
            console.log("pushLaToKafka:");
            console.log(res);
        });
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss']
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map