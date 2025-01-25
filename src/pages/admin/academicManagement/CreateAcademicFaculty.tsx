import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { TResponse } from "../../../types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import PHform from "../../../components/form/PHform";
import PHinput from "../../../components/form/PHinput";
export const academicFacultySchema = z.object({
  name: z
    .string({ required_error: "Please give a Name" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name must be less than 50 characters long." })
    .trim(),
});

export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "Please give a Name" }),
  academicFaculty: z.string({ required_error: "Please select a Faculty Name" }),
});

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastedId = toast.loading("Creating...");
    try {
      const facultyName = data.name;
      const res = (await addAcademicFaculty({
        name: facultyName,
      })) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastedId });
      } else {
        toast.success("Faculty created successfully", { id: toastedId });
      }
    } catch (error) {
      toast.error("Failed to create Faculty. Please try again", {
        id: toastedId,
      });
    }
  };
  return (
    <Flex justify="center">
      <Col span={6}>
        <PHform
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHinput type="text" name="name" label="Name" />
          <Button htmlType="submit">Submit</Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
