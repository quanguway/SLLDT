import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import uiActions from '../../../services/UI/actions';
// import dayjs from 'dayjs';
import Upload, { DraggerProps, RcFile } from 'antd/es/upload';
import { read, utils } from 'xlsx';
import {  DropboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import ButtonExportTemplateScore from './ButtonExportTemplateScore';
import { useAppDispatch } from '../../../store/hooks';
import storage from '../../../utils/sessionStorage';
import apisScoreboard from '../service/apis';
import scoreboardSelectors from '../service/selectors';
import scoreboardActions from '../service/actions';


  
enum EColScore {
  STT = 'STT',
  maHS = 'Mã Học Sinh',
  ho = 'Họ',
  ten = 'Tên',
  mucDatDuoc = 'Mức đạt được',
  diemKTDK = 'Điểm KTĐK',
  nhanXet = 'Nhận xét'
}

export enum ELessonType {
  TALENT = 'talent',
  QUALITY = 'quality',
  LESSON = 'lesion'
}

export enum ELesions {
  TIENG_VIET = 'Tiếng Việt', 
  TOAN ='Toán', 
  KHOA_HOC = 'Khoa Học', 
  LS_DL ='LS và ĐL', 
  TIENG_ANH = 'Tiếng Anh', 
  DAO_DUC = 'Đạo Đức', 
  AM_NHAC = 'Âm Nhạc', 
  MI_THUAT = 'Mĩ Thuật', 
  KI_THUAT = 'Kĩ Thuật', 
  THE_DUC ='Thể Dục'
}

export enum ETalent {
  Tu_Phuc_Vu_Tu_Quan = 'Tự phục vụ, tự quản',
  HOP_TAC = 'Hợp tác',
  TU_HOC_GIAI_QUYET_VAN_DE = 'Tự Học, giải quyết vấn đề',
}

export enum EQuality {
  CHAM_HOC_CHAM_LAM = 'Chăm học, chăm làm',
  TU_TIN_TRACH_NHIEM = 'Tự tin, trách nhiệm',
  TRUNG_THUC_KI_LUAT = 'Trung thực, kĩ luật',
  DOAN_KET_YEU_THUONG = 'Đoàn kết yêu thương',
}

const ButtonImportScore = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    const { Dragger } = Upload;
    const dispatch = useAppDispatch();
    const params = scoreboardSelectors.getParams();
  
    // enum EColExcel {
    //   title = 'Tiêu đề',
    //   date = 'Ngày gửi',
    //   // status = 'Trạng thái',
    //   content = 'Nội dung',
    //   isAutoSend = 'Tự động gửi'
    // }
  
    const saveReport = async(rest: any) => {
      await apisScoreboard.importScoreboard(rest); 
      dispatch(scoreboardActions.getScoreboard.fetch({
        typeEvalution: params.evaluation
      }));
    };
  

  
    useEffect(() => {

      try {
        if(data.typeEvalution) {
          saveReport({
            requestBody: {
              ...data
            }
          });
        }
          // setOpen(false);
          
        // } 
      } catch (e) {
        dispatch(uiActions.setLoadingPage(false));
      } finally {
        dispatch(uiActions.setLoadingPage(false));
      }
    }, [data]);



    // const exportError = () => {
    //   const content = errors.join('\n');
    //   const element = document.createElement('a');
    //   const file = new Blob([content], { type: 'text/plain' });
    //   element.href = URL.createObjectURL(file);
    //   element.download = 'error.txt';
    //   document.body.appendChild(element);
    //   element.click();
    // };
  
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
            rangeInfo.s.r = 6; //row = row + 1
            rangeInfo.s.c = 0;
            rangeInfo.e.c = 3;

            const studentInfos: any[] = utils.sheet_to_json(worksheet, {range: rangeInfo});

            rangeInfo.s.r = 8;
            rangeInfo.s.c = 4;
            rangeInfo.e.c = 32;

            const scoresInfos = utils.sheet_to_json(worksheet, {range: rangeInfo});

            rangeInfo.s.r = 9;
            rangeInfo.s.c = 32;
            rangeInfo.e.c = 42;
            
            const talentInfos = utils.sheet_to_json(worksheet, {range: rangeInfo});

            const dataStudent: any[] = [];
                      
            studentInfos.forEach((item, index) => {

              const scores = [];
              const talents = [];
              const quality = [];

              const talentIds = Object.values(ETalent);
              const talentItem = talentInfos[index] as any;
              if(talentItem) {
                for(const talent_index in talentIds) {
                  console.log(talentIds[talent_index]);
                  const num_index = Number(talent_index) + 1;
                  talents.push({
                    subjectType: 'SUBJECT',
                    subjectId: 'NANG_LUC_' + num_index,
                    evaluationType: 'TALENT',
                    talent: talentItem[talentIds[talent_index]]
                  });
                }
  
                talents. push({
                  subjectType: 'GROUP',
                  subjectGroupId: 'NANG_LUC',
                  evaluationComment: talentItem['Nhận xét']
                });

                const qualityIds = Object.values(EQuality);
                for(const quality_index in qualityIds) {

                  const num_index = Number(quality_index) + 1;
                  quality.push({
                    subjectType: 'SUBJECT',
                    subjectId: 'PHAM_CHAT_' + num_index,
                    evaluationType: 'TALENT',
                    talent: talentItem[qualityIds[quality_index]]
                  });
                }
                talents. push({
                  subjectType: 'GROUP',
                  subjectGroupId: 'PHAM_CHAT',
                  evaluationComment: talentItem['Nhận xét_1']
                });

                const lesions = Object.keys(ELesions);
                for( const lesion_index in lesions ) {
                  const scoresInfo = scoresInfos[index] as any;
                  const getRow = (col: EColScore) => {
                    return `${col}${ Number(lesion_index) > 0 ? '_' + lesion_index : '' }`;
                  };


                  // if(Number(lesion_index) == 0) {
                    console.log(lesions[lesion_index]);
                    console.log(lesion_index);
                    console.log(getRow(EColScore.diemKTDK));
                    console.log(scoresInfo);
                    console.log(scoresInfo[getRow(EColScore.diemKTDK)]);
                    

                  // }
                  
                  
                  scores.push({
                    subjectType: 'SUBJECT',
                    subjectId: lesions[lesion_index],
                    evaluationType: 'SCORE',
                    score: scoresInfo[getRow(EColScore.diemKTDK)],
                    talent: scoresInfo[getRow(EColScore.mucDatDuoc)],
                    evaluationComment: scoresInfo[getRow(EColScore.nhanXet)],
                  });
                }
                dataStudent.push({
                  studentId: item[EColScore.maHS as any],
                  scores: [...scores, ...talents, ...quality, ]
                });
              }
            });

            const result = {
              typeEvalution: params.evaluation,
              classId: storage.get('class_id'),
              data: dataStudent.filter(o => !!o.studentId)  
            };

            setData(result);            

      
          };
          reader.readAsArrayBuffer(file);
        },
    };
  
    return(
      <ButtonImportStyled>
        <Button size='large' type='default' icon={<UploadOutlined />} onClick={() => setOpen(true)}>Import</Button>
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
            <ButtonExportTemplateScore/>
  
          </div>
          {/* <DataTable pagination={false} bordered={false} columns={columns} dataSource={dataSource}/> */}
          <Dragger {...props}>
            <p className='ant-upload-drag-icon'>
              <DropboxOutlined />
            </p>
            <p className='ant-upload-text'>Nhấp hoặc kéo tệp vào khu vực này để tải lên</p>
            <p className='ant-upload-hint'>
              Hỗ trợ tải lên một lần. Xin hãy tuân thủ theo định dạng bên trên
            </p>
          </Dragger>
  
  
  
            {/* {data.length ? <div className='valid-header'>
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
                  <Button size='small' onClick={exportError} style={{padding: '0px'}} icon={<ArrowDownOutlined />} type='text'></Button>
                </Tooltip>
                
              </CardErrorStyled>}
            </div>}
  
            {data.length > 0 && isValid && <div>
              {! (errors.length > 0) ? 
              <CardSuccessStyled><CheckOutlined /> Đã import thành công </CardSuccessStyled>:
              <CardErrorStyled style={{display: 'flex', justifyContent: 'space-between'}}>
                <CloseOutlined /> Import thất bại xin hãy thử lại
              </CardErrorStyled>}
            </div>} */}
        </ModalStyled>}
      </ButtonImportStyled>
    );
  };
  
  export default ButtonImportScore;
  
  
  // const CardSuccessStyled = styled.div`
  //   margin-top: 12px;
  //   width: 97%;
  //   padding: 10px;
  //   border-radius: 4px;
  //   color: #135200;
  //   background-color: #b7eb8f;
  // `;
  
  // const CardErrorStyled = styled.div`
  //   margin-top: 12px;
  //   width: 97%;
  //   padding: 10px;
  //   border-radius: 4px;
  //   color: #a8071a;
  //   background-color: #ffa39e;
  // `;
  
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