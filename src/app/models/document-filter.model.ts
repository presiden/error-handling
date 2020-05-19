import { Doc } from './document.model';

export class DocFilter {
    id: String;
    startDate: string;
    endDate: string;
    type: string;
    listDocument: Array<Doc>;
}