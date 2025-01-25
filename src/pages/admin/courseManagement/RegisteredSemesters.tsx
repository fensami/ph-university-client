import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
// import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TSemester } from "../../../types/coursesManagement.type";
import {
  useGetAllRegistraitonSemestersQuery,
  useUpdateSemesterRegisterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { useState } from "react";
const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];
type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;
const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState("");
  const [updateSemesterStatus] = useUpdateSemesterRegisterMutation(undefined);

  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegistraitonSemestersQuery(undefined);
  console.log("semester data : ", semesterData);

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate,
      status,
    })
  );
  const handleStatusDropdown = (data) => {
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateSemesterStatus(updateData);
  };
  const menuProps = {
    items,
    onClick: handleStatusDropdown,
  };
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "academicSemester",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
      // showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default RegisteredSemesters;
