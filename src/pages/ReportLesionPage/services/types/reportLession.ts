export type ReportLesion = {
  Id: string;
  Name: string;
  CreatedDate: string;
  LastModifiedDate: string;
  Status__c: string;
  SentDay__c: string;
  SendTime__c: number;
  SendMinute__c: number;
  IsAutoSent__c: boolean;
  Content__c: string;
  Title__c: string;
}

export type ParentReportDetail = {
  title: string,
  date: string,
  content: string
}