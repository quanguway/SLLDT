import { Table, TableProps } from 'antd';
import { styled } from 'styled-components';


interface Props<T> extends TableProps<T> {
  ref?: any
}

const DataTable = <T extends {}>({
  // ref,
  ...props
} : Props<T>) => {
  
  // useEffect(() => {
  //   setExportTableRef(tableRef.current.children[0].children[0].children[0].children[0].children[0].children[0]);
  // },[tableRef]);
  
  return (
    <DataTableStyled>
      {/* <DownloadTableExcel
        filename="users table"
        sheet="users"
        currentTableRef={exportTableRef}
    >

        <button> Export excel </button>

    </DownloadTableExcel> */}
      <TableStyled        
        // ref={tableRef}
        rowKey={(item) => item.id}
        size='small'
        bordered
        {...props}
        scroll={{
          x: 100
        }}
        // pagination={true}
        // pagination={{
        //   defaultCurrent: Number(page?.page ?? 1),
        //   total: data?.pagination?.total_record,
        //   defaultPageSize: 10,
        //   current: Number(params.page || ''),
        //   onChange: (pageChange, sizeChange) => {
        //     const params: any = {
        //       page: pageChange == 0 ? 1 : pageChange,
        //       per_page: sizeChange,
        //       keyword: searchParams.get('keyword')
        //     };
        //     dispatch(customerActions.setCustomerListParams(params));
        //   },
        //   showSizeChanger: true,
        //   showTotal(total) {
        //     return `Total ${total} items`;
        //   },
        // }}
      />
    </DataTableStyled>
  );
};

export default DataTable;

const DataTableStyled = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 12px 0px;
`;

const TableStyled = styled(Table)`
  width: 100%;
  .ant-table-thead {
    /* tr:first-child {
      th:last-child {
        position: sticky;
        right: 0;
        top: 0;
        z-index: 1000;
        border: 1px solid #f0f0f0;
      }
    } */
    tr {
      th {
        background-color: white;
        text-wrap: nowrap;
      }
      
      th::before {
        content: none !important;
      }
    }
  }
  /* .ant-table-row-level-0 {
    .ant-table-cell:last-child {
      position: sticky;
      right: 0;
      top: 0;
      z-index: 1000;
      border: 1px solid #f0f0f0;
      background-color: white;
    }
  } */
  .ant-table-cell {
    white-space: nowrap;
  }
`;