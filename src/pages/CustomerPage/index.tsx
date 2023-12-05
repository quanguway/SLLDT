// import DataTable from '../../component/molecule/DataTable';
import ModalButton from '../../component/organism/ModalButton';
import Filter from '../../component/template/Filter';
import ButtonPrimary from '../../component/atom/Button/ButtonPrimary';
import CustomerForm from './widgets/CustomerForm';
// import CustomerDataTable from './widgets/CustomerDataTable';
import InputSearchText from '../../component/atom/Input/InputSearch';
// import * as XLSX from 'xlsx';

const CustomerPage = () => {

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // const file = event.target.files?.[0];

  //   // if (file) {
  //   //   const reader = new FileReader();

  //   //   reader.onload = (e) => {
  //   //     const data = e.target?.result;
  //   //     // const workbook = XLSX.read(data, { type: 'binary' });

  //   //     // const sheetName = workbook.SheetNames[0]; // Assuming there's only one sheet
  //   //     // const sheet = workbook.Sheets[sheetName];

  //   //     // Convert the sheet data to JSON
  //   //     // const jsonResult = sheetToJsonWithMergedCells(sheet);
  //   //   };

  //   //   reader.readAsBinaryString(file);
  //   // }
  // };

  // const sheetToJsonWithMergedCells = (sheet: XLSX.WorkSheet) => {
  //   // Parse the sheet and detect merged cells
  //   const jsonResult = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  //   // Handle merged cells
  //   const mergedCells = sheet['!merges'] || [];

  //   for (const merge of mergedCells) {
  //     // const [startRow, endRow, startCol, endCol] = merge;

  //     // // Merge the data in JSON
  //     // for (let row = startRow; row <= endRow; row++) {
  //     //   for (let col = startCol; col <= endCol; col++) {
  //     //     // Skip the cell where merging started
  //     //     if (row === startRow && col === startCol) continue;

  //     //     // Set the merged cell data to the same as the starting cell
  //     //     jsonResult[row][col] = jsonResult[startRow][startCol];
  //     //   }
  //     // }
  //   }

  //   return jsonResult;
  // };


  return (
    <>
      <Filter>
          <ModalButton title={'Customer'} buttonRender={<ButtonPrimary label='Add Customer'/>}>
            <CustomerForm/>
          </ModalButton>
          <InputSearchText/>
          <input type="file" onChange={() => undefined} />
        </Filter>
      {/* <CustomerDataTable /> */}
    </>
  );
};

export default CustomerPage;