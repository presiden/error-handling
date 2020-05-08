import { TestBed } from '@angular/core/testing';
import { DocumentService } from './document.service';
describe('DocumentService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DocumentService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=document.service.spec.js.map