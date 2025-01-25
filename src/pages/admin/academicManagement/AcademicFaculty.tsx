import { Button, Table, TableProps } from "antd";
import { TQueryParam } from "../../../types/global";
import { useState } from "react";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
export type TTableData = Pick<TAcademicFaculty, "name">;
const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: academicFaculty,
    isLoading,
    isFetching,
  } = useGetAcademicFacultiesQuery(params);

  const tableData = academicFaculty?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableProps<TTableData>["columns"] = [
    {
      title: "Faculty Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </div>
  );
};

export default AcademicFaculty;
