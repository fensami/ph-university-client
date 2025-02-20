import { TAdmin, TFaculty, TStudent } from "../../../types";
import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudents: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: "/students",
                    method: "GET",
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<TStudent[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        addStudent: builder.mutation({
            query: (data) => ({
                url: "/users/create-student",
                method: "POST",
                body: data
            }),
        }),
        // Get All Faculties
        getAllFaculties: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: "/faculties",
                    method: "GET",
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<TFaculty[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        // post Method Create Faculty
        addFaculty: builder.mutation({
            query: (data) => ({
                url: "/users/create-faculty",
                method: "POST",
                body: data
            }),
        }),
        // Post Method Create Admin
        addAdmin: builder.mutation({
            query: (data) => ({
                url: "/users/create-admin",
                method: "POST",
                body: data
            }),
        }),
        // Get All Admins
        getAllAdmins: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: "/admins",
                    method: "GET",
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<TAdmin[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),


    }),
})

export const {
    useAddStudentMutation,
    useGetAllStudentsQuery,
    useAddFacultyMutation,
    useGetAllFacultiesQuery,
    useAddAdminMutation,
    useGetAllAdminsQuery
} = userManagementApi;