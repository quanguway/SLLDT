
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
// @ts-ignore
import template from '../../../asset/excel/template_nhap_diem.xlsx';

const ButtonExportTemplateScore = () => {

  // const exportTableRef = useRef<any>();


  // const handleDownTemplate = () => {

    
  //   const workbook = read(TEMPLATE_NHAP_DIEM_X64, {type: 'base64'});
  //   const base64 = write(workbook, { bookType: 'xlsx', type: 'binary' });

    

  //   // const workbook = readFile(template);
  //   const sheetName = workbook.SheetNames[0];
  //   const worksheet = workbook.Sheets[sheetName];

  //   // const workbook = XLSX.read(bufferExcel, { type: 'buffer' });

  //   // const ws = utils.sheet_to_json(worksheet);
  //   // const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  //   // const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
  //   // const data = new Blob([TEMPLATE_NHAP_DIEM_X64], {type: fileType});
  //   // FileSaver.saveAs(data, 'file' + fileExtension);

  //   const sliceSize = 1024;
  //   const byteCharacters = atob(base64);
  //   const bytesLength = byteCharacters.length;
  //   const slicesCount = Math.ceil(bytesLength / sliceSize);
  //   const byteArrays = new Array(slicesCount);
    
  //   for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
  //     const begin = sliceIndex * sliceSize;
  //     const end = Math.min(begin + sliceSize, bytesLength);
  //     const bytes = new Array(end - begin);
  //     for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
  //       bytes[i] = byteCharacters[offset].charCodeAt(0);
  //     }
  //     byteArrays[sliceIndex] = new Uint8Array(bytes);
  //   }
    
  //   FileSaver.saveAs(
  //     new Blob(byteArrays, { type: 'application/vnd.ms-excel' }),
  //     'my-excel.xlsx'
  //   );

  //   // console.log(json);
    
  // };

  return (
    <>
      {/* <DownloadTableExcel
        filename='template_bang_diem'
        sheet='bang_diem'
        currentTableRef={exportTableRef.current}
        > */}
          {/* <Button size='small' type='default' icon={<DownloadOutlined />}>Download</Button> */}
          {/* <Button onClick={handleDownTemplate} size='small' type='default' icon={<DownloadOutlined />}>Download</Button> */}

          <Button size='small' type='default' icon={<DownloadOutlined />}><a href={template} download="template_score_board">Download</a></Button>
          
        {/* </DownloadTableExcel> */}
        {/* <table style={{
          display: 'none'
        }} ref={exportTableRef}>
          <tr >
            <td colSpan={39}>Lớp 1 - 1</td>
          </tr>
          <tr >
            <td style={{color: 'red'}} colSpan={39}>* Lưu ý: Chỉ nhập thông tin, không chỉnh sửa format của bảng điểm</td>
          </tr>
          <tr>
            <th rowSpan={4}>STT</th>
            <th rowSpan={4}>Mã Học Sinh</th>
            <th rowSpan={4}>Họ</th>
            <th rowSpan={4}>Tên</th>
            <th colSpan={30}>Các môn học và hoạt động giáo dục</th>
            <th colSpan={9}>Các năng lực, phẩm chất</th>
            <th ></th>
          </tr>
          <tr>
            <th  colSpan={3}>Tiếng Việt</th>
            <th  colSpan={3}>Toán</th>
            <th  colSpan={3}>Khoa Học</th>
            <th  colSpan={3}>LS và ĐL</th>
            <th  colSpan={3}>Tiếng Anh</th>
            <th  colSpan={3}>Đạo Đức</th>
            <th  colSpan={3}>Âm Nhạc</th>
            <th  colSpan={3}>Mĩ Thuật</th>
            <th  colSpan={3}>Kĩ Thuật</th>
            <th  colSpan={3}>Thể Dục</th>
            <th  colSpan={4} rowSpan={2}>Năng lực</th>
            <th  colSpan={5} rowSpan={2}>&nbsp;Phẩm chất</th>
            <th ></th>
          </tr>
          <tr>
            <th  rowSpan={2}>Mức đạt được</th>
            <th  rowSpan={2}>Điểm KTĐK</th>
            <th  rowSpan={2}>Nhận xét</th>
            <th  rowSpan={2}>Mức đạt được</th>
            <th  rowSpan={2}>Điểm KTĐK</th>
            <th  rowSpan={2}>Nhận xét</th>
            <th  rowSpan={2}>Mức đạt được</th>
            <th  rowSpan={2}>Điểm KTĐK</th>
            <th  rowSpan={2}>Nhận xét</th>
            <th  rowSpan={2}>Mức đạt được</th>
            <th  rowSpan={2}>Điểm KTĐK</th>
            <th  rowSpan={2}>Nhận xét</th>
            <th  rowSpan={2}>Mức đạt được</th>
            <th  rowSpan={2}>Điểm KTĐK</th>
            <th  rowSpan={2}>Nhận xét</th>
            <th  rowSpan={2}>Mức đạt được</th>
            <th  rowSpan={2}>Điểm KTĐK</th>
            <th  rowSpan={2}>Nhận xét</th>
            <th  rowSpan={2}>Mức đạt được</th>
            <th  rowSpan={2}>Điểm KTĐK</th>
            <th  rowSpan={2}>Nhận xét</th>
            <th  rowSpan={2}>Mức đạt được</th>
            <th  rowSpan={2}>Điểm KTĐK</th>
            <th  rowSpan={2}>Nhận xét</th>
            <th  rowSpan={2}>Mức đạt được</th>
            <th  rowSpan={2}>Điểm KTĐK</th>
            <th  rowSpan={2}>Nhận xét</th>
            <th  rowSpan={2}>Mức đạt được</th>
            <th  rowSpan={2}>Điểm KTĐK</th>
            <th  rowSpan={2}>Nhận xét</th>
            <th ></th>
          </tr>
          <tr>
            <th >Tự phục vụ, tự quản</th>
            <th >Hợp tác</th>
            <th >Tự Học, giải quyết vấn đề</th>
            <th >Nhận xét</th>
            <th >Chăm học, chăm làm</th>
            <th >Tự tin, trách nhiệm</th>
            <th >Trung thực, kĩ luật</th>
            <th >Đoàn kết yêu thương</th>
            <th >Nhận xét</th>
            <th ></th>
          </tr>
          <tr>
            <td >1</td>
            <td >123456</td>
            <td >Nguyễn Nhật</td>
            <td >Quang</td>
          </tr>
        </table> */}
    </>
    )

  ;
};

export default ButtonExportTemplateScore;