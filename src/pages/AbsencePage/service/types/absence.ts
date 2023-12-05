export type TAbsenceBody = {
  HocSinh__c: string;
  ClassHeader__c: string;
  NgayNop__c: string;
  NgayNghi__c: string;
  SoNgayNghi__c: number;
  TrangThai__c: 'ACCEPT' | 'PENDING' | 'DRAFT' | 'DELETE';
  LyDo__c: string;
  Id?: string;
}

export type TAbsenceRes = {
  Id: string;
  Name: string;
  CreatedDate: string;
  LastModifiedDate: string;
  HocSinh__c: string;
  ClassHeader__c: string;
  NgayNop__c: string;
  NgayNghi__c: string;
  SoNgayNghi__c: number;
  TrangThai__c: string;
  LyDo__c: string;
  HocSinh: HocSinh;
}

type HocSinh = {
  Id: string;
  Name: string;
}