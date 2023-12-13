import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

//@ts-ignore
import template from '../../../asset/excel/template_bao_bai.xls';

const ButtonExportTemplate = () => {


  return (
    <>
      {/* <DownloadTableExcel
        filename='template_bao_bai'
        sheet='bao_bai'
        currentTableRef={exportTableRef.current}
        > */}
        {/* <Button size='small' type='default' icon={<DownloadOutlined />}> <a>Download</a> </Button> */}
          <Button size='small' type='default' icon={<DownloadOutlined />}><a href={template} download="template_bao_bai">Tải xuống</a></Button>

        {/* </DownloadTableExcel> */}
        {/* <table style={{
          display: 'none'
        }} ref={exportTableRef}>
          <p>Lớp 1 - 1</p>
          <p style={{color: 'red'}}>* Lưu ý: Chỉ nhập thông tin, không chỉnh sửa format của bảng điểm</p>
          <p>Cột tự động gửi chỉ có 2 giá trị là: Có hoặc Không</p>
          <tr>
            <th>Tiêu đề</th>
            <th>Ngày gửi</th>
            <th>Nội dung</th>
            <th>Tự động gửi</th>
          </tr>
          <tbody>
            <tr>
              <td>Bài học 1-1</td>
              <td>05/10/2023 14:23</td>
              <td>Làm bài tập số 3 trang 67</td>
              <td>Có</td>
            </tr>
          </tbody>
        </table> */}
    </>
    )

  ;
};

export default ButtonExportTemplate;