import { TAcademicSemester } from "../../../types/academicManagement.type";
import { TSemester } from "../../../types/coursesManagement.type";
import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRegistraitonSemesters: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: "/semester-registrations",
                    method: "GET",
                    params: params
                }
            },
            providesTags: ["semester"],
            transformResponse: (response: TResponseRedux<TSemester[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        addSemesterRegister: builder.mutation({
            query: (data) => ({
                url: "/semester-registrations/create-semester-registration",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["semester"]
        }),
        updateSemesterRegister: builder.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: "PATCH",
                body: args.data,
            }),
            invalidatesTags: ["semester"]
        }),
        // Get All Courses
        getAllCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: "/courses",
                    method: "GET",
                    params: params
                }
            },
            providesTags: ["courses"],
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        // Add Course
        addCourse: builder.mutation({
            query: (data) => ({
                url: "/courses/create-course",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["semester"]
        }),
        // Add Faculties
        addFaculties: builder.mutation({
            query: (args) => ({
                url: `/courses/${args.courseId}/assign-faculties`,
                method: "PUT",
                body: args.data
            }),
            invalidatesTags: ["semester"]
        }),
    }),
})

export const {
    useAddSemesterRegisterMutation,
    useGetAllRegistraitonSemestersQuery,
    useUpdateSemesterRegisterMutation,
    useAddCourseMutation,
    useGetAllCoursesQuery,
    useAddFacultiesMutation
} = courseManagementApi;