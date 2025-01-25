import { FieldValues, SubmitHandler } from "react-hook-form";
import PHform from "../../../components/form/PHform";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useAddAcademicSemesterMutation,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import PHinput from "../../../components/form/PHinput";
import { useAddSemesterRegisterMutation } from "../../../redux/features/admin/courseManagement.api";
import PHdatePicker from "../../../components/form/PHdatePicker";
import { semesterStatusOptions } from "../../../constants/semester";

// const nameOptions = [
//   {
//     value: "01",
//     label: "Autumn",
//   },
//   {
//     value: "02",
//     label: "Summer",
//   },
//   {
//     value: "03",
//     label: "Fall",
//   },
// ];

const SemesterRegistration = () => {
  const [addSemester] = useAddSemesterRegisterMutation();
  const { data: academicSemester } = useGetAllSemestersQuery([
    {
      name: "sort",
      value: "year",
    },
  ]);
  console.log(academicSemester);
  const academicSemesterOptions = academicSemester?.data.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    // console.log(data);
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester Created Success", { id: toastId });
      }
    } catch (err) {
      toast.error("something wents wrong", { id: toastId });
    }
  };
  // const academicSemesterSchema = z.object({
  //   name: z.string({ required_error: "Please Select A Name" }),
  //   year: z.string({ required_error: "Please Select A Year" }),
  //   startMonth: z.string({ required_error: "Please Select A StartMonth " }),
  //   endMonth: z.string({ required_error: "Please Select A EndMonth" }),
  // });
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHform onSubmit={onSubmit}>
          {/* <PHinput type="name" name="name" label="name" />
          <PHinput type="year" name="year" label="year" /> */}
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PHSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <PHdatePicker name="startDate" label="Start Date" />
          <PHdatePicker name="endDate" label="End Date" />
          <PHinput type="text" name="minCredit" label="Min Credit" />
          <PHinput type="text" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
