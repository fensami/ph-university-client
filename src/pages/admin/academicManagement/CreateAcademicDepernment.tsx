import { Button, Col, Flex } from "antd";
import PHform from "../../../components/form/PHform";
import PHinput from "../../../components/form/PHinput";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";

const CreateAcademicDepernment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data: faculties, isLoading } = useGetAcademicFacultiesQuery([]); // Fetch academic faculties

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastedId = toast.loading("Creating...");
    try {
      const departmentData = {
        name: data.name,
        academicFaculty: data.academicFaculty, // Selected faculty ID
      };

      const res = await addAcademicDepartment(departmentData).unwrap();

      if (res.error) {
        toast.error(res.error.data.message, { id: toastedId });
      } else {
        toast.success("Department created successfully", { id: toastedId });
      }
    } catch (error) {
      toast.error("Failed to create department. Please try again.", {
        id: toastedId,
      });
    }
  };
  const facultyOptions = faculties?.data?.map((item) => ({
    value: item?._id, // Faculty ID
    label: item?.name, // Faculty Name
  }));
  return (
    <Flex justify="center">
      <Col span={6}>
        <PHform onSubmit={onSubmit}>
          <PHinput type="text" name="name" label="Department Name" />

          <PHSelect
            label="Faculty Name"
            name="academicFaculty"
            options={facultyOptions}
            disabled={isLoading}
            // loading={isLoading} // Show loading spinner while data is being fetched
            placeholder="Select a faculty"
          />

          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </PHform>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepernment;
