export type IApiLoginBody = {
  phone: string;
  password: string;
}

export interface IApiLoginResData {
  Id: string;
  Name: string;
  UserName__c: string;
  BirthDay__c: string;
  Email__c: string;
  Gender__c: boolean;
  Phone__c: string;
  token: string;
  Role: Role;
  Account: Account;
  Class: Class;
  Student: Student;
}

interface Class {
  Id: string;
  Name: string;
  NumOfStudent__c: number;
  Status__c: string;
}

interface Account {
  Id: string;
  MaGiaoVien__c: string;
  Name: string;
}

interface Role {
  Id: string;
  Active__c: boolean;
  Description__c?: any;
  Title__c: string;
}

interface Student {
  Id: string;
  Name: string;
}
