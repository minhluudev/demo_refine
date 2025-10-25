"use client";

import { DataProvider } from "@refinedev/core";
import axios from "axios";

const API_URL = "http://localhost:8000/api";
const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const dataProvider: DataProvider = {
	// ✅ GET LIST (phân trang, sort, filter)
	getList: async ({ resource, pagination, sorters, filters }) => {
		const { currentPage = 1, pageSize = 10 } = pagination ?? {};

		const response = await axiosInstance.get(`/${resource}`, {
			params: {
				page: currentPage,
				per_page: pageSize,
			},
		});

		const data = response.data.data ?? [];
		const total = response.data.meta?.total ?? data.length;

		return {
			data,
			total,
		};
	},

	// ✅ GET ONE
	getOne: async ({ resource, id }) => {
		const response = await axiosInstance.get(`/${resource}/${id}`);
		return { data: response.data.data ?? response.data };
	},

	// ✅ CREATE
	create: async ({ resource, variables }) => {
		const response = await axiosInstance.post(`/${resource}`, variables);
		return { data: response.data.data ?? response.data };
	},

	// ✅ UPDATE
	update: async ({ resource, id, variables }) => {
		const response = await axiosInstance.put(`/${resource}/${id}`, variables);
		return { data: response.data.data ?? response.data };
	},

	// ✅ DELETE
	deleteOne: async ({ resource, id }) => {
		const response = await axiosInstance.delete(`/${resource}/${id}`);
		return { data: response.data.data ?? response.data };
	},

	getApiUrl: function (): string {
		throw new Error("Function not implemented.");
	}
};
