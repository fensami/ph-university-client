import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";
import PHinput from "../../../components/form/PHinput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHSelect from "../../../components/form/PHSelect";
import PHdatePicker from "../../../components/form/PHdatePicker";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";

const adminDammyData = {
  password: "faculty123",
  faculty: {
    designation: "Lecturer",
    name: {
      firstName: "Mridul ",
      middleName: "Das",
      lastName: "Rahman",
    },
    gender: "male",
    // email: "faculty3@gmail.com",
    dateOfBirth: "1990-01-01",
    contactNo: "123",
    emergencyContactNo: "123",
    bloogGroup: "A+",
    presentAddress: "123 Main St, Cityville",
    permanentAddress: "456 Oak St, Townsville",
    academicDepartment: "65b00fb010b74fcbd7a25d8e",
  },
};
// This is only for development
const facultyDefaultValues = {
  designation: "Admin",
  name: {
    firstName: "kaku",
    middleName: "admin",
    lastName: "kaku",
  },
  gender: "male",
  // dateOfBirth: "1990-01-01",
  bloogGroup: "A+",

  // email: "faculty3@gmail.com",
  contactNo: "123",
  emergencyContactNo: "123",

  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",
};

const CreateAdmin = () => {
  const [addAdmin, { data, error }] = useAddAdminMutation();
  console.log(data, error);

  // const { data: dData, isLoading: dIsLoading } =
  //   useGetAcademicDepartmentsQuery(undefined);

  // const departmentOptions = dData?.data?.map((item) => ({
  //   value: item._id,
  //   label: item.name,
  // }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const adminData = {
      password: "admin123",
      admin: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data.image);
    console.log("data:", data);

    addAdmin(formData);
    //! this is for development testing purpose
    // console.log(Object.fromEntries(formData));
  };
  return (
    <Row>
      <Col span={24}>
        <PHform onSubmit={onSubmit} defaultValues={facultyDefaultValues}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput type="text" name="designation" label="Designation" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHdatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloogGroup"
                label="Blood Group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="image">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput type="text" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHinput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          {/* <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Admission Department"
              />
            </Col>
          </Row> */}
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
