const PaginationConfig = (data: { meta: { currentPage: string, itemsPerPage: number, totalItems: number } }) => {
  if (!data) {
    return false;
  }

  return {
    current: data?.meta?.currentPage,
    pageSize: data?.meta?.itemsPerPage,
    total: data?.meta?.totalItems,
  };
};

export default PaginationConfig;
