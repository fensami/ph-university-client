import { Button, Col, Flex } from "antd";
import PHform from "../../../components/form/PHform";
import PHSelect from "../../../components/form/PHSelect";
import PHinput from "../../../components/form/PHinput";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const OffereCourse = () => {
  const [id, setId] = useState("");
  console.log("inside parant component", id);

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const onSubmit: SubmitHandler<FieldValues> = (data) => {};
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHform onSubmit={onSubmit}>
          <PHSelectWithWatch
            onValueChange={setId}
            label="Academic Semester"
            name="academicSemester"
            options={academicFacultyOptions}
          />
          <PHinput disabled={!id} type="text" name="test" label="Test" />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default OffereCourse;
