import { Button, Modal, Tooltip, Upload } from 'antd';
import DataTable from '../../../component/molecule/DataTable';
import { useEffect, useState } from 'react';
import { ArrowDownOutlined, CheckOutlined, CloseOutlined, DropboxOutlined, UploadOutlined } from '@ant-design/icons';
import { DraggerProps, RcFile } from 'antd/es/upload';
import { read, utils } from 'xlsx';
import dayjs from 'dayjs';
import storage from '../../../utils/sessionStorage';
import apisLesion from '../services/apis';
import { styled } from 'styled-components';
import { useAppDispatch } from '../../../store/hooks';
import uiActions from '../../../services/UI/actions';
import ButtonExportTemplate from './ButtonExportTemplate';
import lesionActions from '../services/actions';

const ButtonImport = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isImport, setisImport] = useState<boolean | null>(null);
  const [isValid, setIsValid] =useState<boolean>(false);
  const { Dragger } = Upload;
  const classId = storage.get('class_id');
  const dispatch = useAppDispatch();

  // const statusAccept = ['đã gửi', 'lưu nháp', 'đang gửi', 'Gửi tự động  '];
  // const isAutoSendAccept = ['có', 'không'];

  enum EColExcel {
    title = 'Tiêu đề',
    date = 'Ngày gửi',
    status = 'Trạng thái lưu',
    content = 'Nội dung',
    isAutoSend = 'Tự động gửi'
  }

  const saveReport = async(rest: any) => {
    try{
    await apisLesion.saveLesion(rest); 
      dispatch(lesionActions.getListLesion.fetch());
      setisImport(true);
    } catch (e) {
      setisImport(false);
    }
  };

  const getStringError = (col: string, index: number, ) => {
    return `Cột '${col}' dòng ${index + 4} đang sai định dạng`;
  };

  const getStringErrorEmpty = (col: string, index: number, ) => {
    return `Cột '${col}' dòng ${index + 4} không được đề trống`;
  };

  useEffect(() => {
    
    setIsValid(false);
    const errors: string[] = [];
    try {
      if(data && (data as any[]).length > 0) {
        dispatch(uiActions.setLoadingPage(true));
  
        const xlsxCol: string[] = Object.values(EColExcel);
        const columns = Object.keys(data[0])?.filter(o => xlsxCol?.find(i => i?.toLowerCase() === o?.toLowerCase()));
  

        if(! (columns.length === xlsxCol.length)) {
          return;
          
        }
        setIsValid(true);

        const rest = data.map((o: any, index: number) => {
  
          if(! dayjs(o[EColExcel.date], 'DD/MM/YYYY  HH:mm').isValid()) {
            errors.push(getStringError(EColExcel.date, index));
            return;
          }

          if( dayjs(o[EColExcel.date], 'DD/MM/YYYY  HH:mm').isBefore(dayjs().subtract(1, 'day'))) {
            errors.push(`Cột '${EColExcel.date}' dòng ${index + 4} phải lớn hơn ngày hiện tại`);
            return;
          }
  
          // if(! isAutoSendAccept.includes((o[EColExcel.isAutoSend] as string)?.toLowerCase())) {
          //   errors.push(getStringError(EColExcel.isAutoSend, index));
          //   return;
          // }
  
          // if(! statusAccept.includes((o[EColExcel.status] as string)?.toLowerCase())) {
          //   errors.push(getStringError(EColExcel.status, index));
          //   return;
          // }
  
          if(o[EColExcel.title] === '') {
            errors.push(getStringErrorEmpty(EColExcel.title, index));
            return;
          }
  
          if(o[EColExcel.content] === '') {
            errors.push(getStringErrorEmpty(EColExcel.content, index));
            return;
          }
  
  
  
          const date = dayjs(o[EColExcel.date], 'DD/MM/YYYY  HH:mm');
          const autoSend = (o[EColExcel.isAutoSend] as string)?.toLowerCase() === 'Có'?.toLowerCase();
          // const status = (o[EColExcel.status] as string)?.toLowerCase() === 'Lưu nháp'?.toLowerCase() ? 'Draft' : undefined;
  
          return {
            title: o[EColExcel.title],
            sentDay: date.format('YYYY-MM-DD'),
            sendTime: date.get('hour'),
            sendMinute: date.get('minute'),
            isAutoSent: autoSend,
            classID: classId,
            status: status,
            content: o[EColExcel.content]
          };});
          if(errors.length > 0) return setErrors(errors);
        
        saveReport(rest);
        // setOpen(false);
        
      } 
    } catch (e) {
      dispatch(uiActions.setLoadingPage(false));
    } finally {
      dispatch(uiActions.setLoadingPage(false));
    }
  }, [data]);

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

  const exportError = () => {
    const content = errors.join('\n');
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'error.txt';
    document.body.appendChild(element);
    element.click();
  };

  const props: DraggerProps = {
      accept: '.xlsx, .xls',
      name: 'file',
      multiple: false,
      showUploadList: false,
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      beforeUpload: (file: RcFile) => {
        
        const reader = new FileReader();
        reader.onload = (e) => {          
          const data = e?.target?.result;
          const workbook = read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];

          const worksheet = workbook.Sheets[sheetName];
          const rangeInfo = utils.decode_range(worksheet['!ref'] ?? '');
          rangeInfo.s.r = 3; //row = row + 1


          const json = utils.sheet_to_json(worksheet, {range: rangeInfo});
          setData(json.filter((o: any) => !!o[EColExcel.content]));
          // const keys = Object.keys(json[0]);

          // template.forEach(o => {
            // if(keys.find(s => s === o.title)) {
            //   o.valid()
            // }
          // });
        };
        reader.readAsArrayBuffer(file);
      },
    };

  return(
    <ButtonImportStyled>
      <Button size='large' type='default' icon={<UploadOutlined />} onClick={() => {
        setOpen(true);
        setData([]);
        setErrors([]);
        // setisImport(false);
        setIsValid(false);
        }}>Import</Button>
      {open && <ModalStyled
      style={{
        minWidth: '800px'
      }}
        onCancel={() => setOpen(false)}
        open={open}         
        footer={null}
        forceRender
        >
        <h2>Import file</h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>

          <p style={{opacity: '.6'}}>* Download template import file ở đây</p>
          <ButtonExportTemplate/>

        </div>
        <DataTable pagination={false} bordered={false} columns={columns} dataSource={dataSource}/>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <DropboxOutlined />
          </p>
          <p className="ant-upload-text">Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
          <p className="ant-upload-hint">
            Hỗ trợ tải lên một lần. Xin hãy tuân thủ theo định dạng bên trên
          </p>
        </Dragger>



          {data.length ? <div className='valid-header'>
            {isValid ? 
              <CardSuccessStyled><CheckOutlined /> Định dạng header đúng </CardSuccessStyled> : 
              <CardErrorStyled><CloseOutlined /> Định dạng header sai </CardErrorStyled>}
          </div> : <></>}

          {data.length > 0 && isValid && <div>
            {! (errors.length > 0) ? 
            <CardSuccessStyled><CheckOutlined /> Định dạng record đúng </CardSuccessStyled>:
            <CardErrorStyled style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>
                <CloseOutlined /> Định dạng record sai ({errors.length})
              </div>
              <Tooltip title='Download error'>
                <Button onClick={exportError} style={{padding: '0px'}} icon={<ArrowDownOutlined />} type='text'></Button>
              </Tooltip>
              
            </CardErrorStyled>}
          </div>}

          {isImport !== null && data.length > 0 && isValid && <div>
            { isImport ? 
            <CardSuccessStyled><CheckOutlined /> Đã import thành công </CardSuccessStyled>:
            <CardErrorStyled style={{display: 'flex', justifyContent: 'space-between'}}>
              <CloseOutlined /> Import thất bại xin hãy thử lại
            </CardErrorStyled>}
          </div>}
      </ModalStyled>}
    </ButtonImportStyled>
  );
};

export default ButtonImport;


const CardSuccessStyled = styled.div`
  margin-top: 12px;
  width: 97%;
  padding: 10px;
  border-radius: 4px;
  color: #135200;
  background-color: #b7eb8f;
`;

const CardErrorStyled = styled.div`
  margin-top: 12px;
  width: 97%;
  padding: 10px;
  border-radius: 4px;
  color: #a8071a;
  background-color: #ffa39e;
`;

const ModalStyled = styled(Modal)`

  .valid-header {

  }

  .errors {
    color: red;
    max-height: 300px;
    overflow: scroll;
    width: 100%;
  }
`;

const ButtonImportStyled = styled.div`
  
`;