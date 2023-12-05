import { useNavigate } from 'react-router-dom';
import DataTable from '../../component/molecule/DataTable';
import Filter from '../../component/template/Filter';
import { useEffect } from 'react';

const DashboardPage = () => {

  // const data: any[] = [];

  // const columns: ColumnDef<any>[]= [
  //   {
  //     header: 'id',
  //     accessorKey: 'id'
  //     footer
  //   }
  // ];

  // const table = useReactTable({data, columns}); 

  // const onSubmit = (values: any) => {
    
  // };
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/auth/sign-in');

  }, []);

  return (
    <>
      <Filter>
       
      </Filter>
      <DataTable />
    </>
  );
};

export default DashboardPage;