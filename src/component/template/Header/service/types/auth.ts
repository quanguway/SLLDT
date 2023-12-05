export type IApiNotificationBody = {
  userId: string | null;
}

export interface IApiNotificationResData {
  Id: string;
  IsDeleted: boolean;
  Name: string;
  CreatedDate: Date;
  Users__c: string;
  ExternalID__c: string;
  Type__c: string;
  IsSeen__c: boolean;
  Message__c: string;
}
