export type TimeTableType = {
  Id: string;
  Name: string;
  CreatedDate: string;
  LastModifiedDate: string;
  Title__c: string;
  EndDate__c: string;
  StartDate__c: string;
  Status__c: string;
  ClassHeader__c: string;
  detail: DetailType[];
}

export type DetailType = {
  Id: string;
  Name: string;
  CreatedDate: string;
  LastModifiedDate: string;
  Schedule__c: string;
  Subject__c?: string;
  Lesson__c: string;
  Day__c: string;
}