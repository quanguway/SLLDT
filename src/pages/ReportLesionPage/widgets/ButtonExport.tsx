import { Button, Modal } from 'antd';
import DataTable from '../../../component/molecule/DataTable';
import { useEffect, useState } from 'react';
import {  DownloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import storage from '../../../utils/sessionStorage';
import apisLesion from '../services/apis';

const ButtonExport = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [data,] = useState<any>(false);
  // const { Dragger } = Upload;
  const classId = storage.get('class_id');


  enum EColExcel {
    title = 'Tiêu đề',
    date = 'Ngày gửi',
    status = 'Trạng thái',
    content = 'Nội dung',
    isAutoSend = 'Tự động gửi'
  }

  const saveReport = async(rest: any) => {
    await apisLesion.saveLesion(rest); 
  };

  useEffect(() => {
    if(data) {
      const rest = data.map((o: any) => {
        const date = dayjs(o[EColExcel.date], 'DD/MM/YYYY HH:mm');
        const autoSend = (o[EColExcel.isAutoSend] as string).toLowerCase() === 'Có'.toLowerCase();
        const status = (o[EColExcel.status] as string).toLowerCase() === 'Lưu nháp'.toLowerCase() ? 'Draft' : undefined;

        return {
          sentDay: date.format('YYYY-MM-DD'),
          sendTime: date.get('hour'),
          sendMinute: date.get('minute'),
          isAutoSent: autoSend,
          classID: classId,
          status: status,
          content: o[EColExcel.content]
        };});
        
        saveReport(rest);
         
        
      setOpen(false);
      
    }
  }, [data]);
  

  // const template = [
  //   {
  //     title: 'Tiêu đề',
  //   },
  //   {
  //     title: 'Ngày gửi',
  //     valid: (value: string) => {
  //       const regex = /^\d{4}[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/g;
  //       return value.match(regex);
  //     }
  //   },
  //   {
  //     title: 'Trạng thái',
  //   }
  // ];

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'Title__c',
      key: 'Title__c',
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'SentDay__c',
      key: 'SentDay__c',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status__c',
      key: 'Status__c',
    },
    {
      title: 'Nội dung',
      dataIndex: 'Content__c',
      key: 'Content__c',
    },
    {
      title: 'Tự động gửi',
      dataIndex: 'IsAutoSent__c',
      key: 'IsAutoSent__c',
    }
  ];

  const dataSource = [
    {
      Title__c: 'Bài học 1-1',
      SentDay__c: '05/10/2023 14:23',
      Status__c: 'Đã gửi',
      Content__c: 'Làm bài tập số 3 trang 67', 
      IsAutoSent__c: 'Có'

    }
  ];

  // const props: DraggerProps = {
  //     accept: '.xlsx',
  //     name: 'file',
  //     multiple: false,
  //     showUploadList: false,
  //     // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //     beforeUpload: (file: RcFile) => {
        
  //       const reader = new FileReader();
  //       reader.onload = (e) => {          
  //         const data = e?.target?.result;
  //         const workbook = read(data, { type: 'array' });
  //         const sheetName = workbook.SheetNames[0];
  //         const worksheet = workbook.Sheets[sheetName];
  //         const json = utils.sheet_to_json(worksheet);
  //         setData(json);
  //         // const keys = Object.keys(json[0]);

  //         // template.forEach(o => {
  //           // if(keys.find(s => s === o.title)) {
  //           //   o.valid()
  //           // }
  //         // });
  //       };
  //       reader.readAsArrayBuffer(file);
  //     },
  //   };

  return(
    <>
      <Button size='large' type='default' icon={<DownloadOutlined />} onClick={() => setOpen(true)}>Export</Button>
      <Modal 
        style={{
          minWidth: '800px'
        }}
          onCancel={() => setOpen(false)}
          open={open}         
          footer={null}
          forceRender
          >
          <h2>Export file</h2>
          <p style={{opacity: '.6'}}>* Xuất file sẽ có dịnh dạng như sau</p>
          <DataTable pagination={false} bordered={false} columns={columns} dataSource={dataSource}/>
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <Button type='primary' size='large' style={{marginLeft: '0px'}}>Export File</Button>
          </div>
          {/* <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <DropboxOutlined />
            </p>
            <p className="ant-upload-text">Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
            <p className="ant-upload-hint">
              Hỗ trợ tải lên một lần. Xin hãy tuân thủ theo định dạng bên trên
            </p>
          </Dragger> */}
      </Modal>
    </>
  );
};

export default ButtonExport;