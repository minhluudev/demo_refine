"use client";

import { DataProvider } from "@refinedev/core";
import axios from "axios";

const API_URL = "http://localhost:8000/api";
const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, sorters, filters }) => {
    const { currentPage = 1, pageSize = 10 } = pagination ?? {};
    const query: Record<string, string> = {};

    console.log("filters", filters);
		
    filters?.forEach((filter: any) => {
      if (filter.field && filter.value) {
        query[filter.field] = filter.value;
      }
    });

    const response = await axiosInstance.get(`/${resource}`, {
      params: {
        page: currentPage,
        per_page: pageSize,
        ...query,
      },
    });

    const data = response.data.data ?? [];
    const total = response.data.meta?.total ?? data.length;

    return {
      data,
      total,
    };
  },

  getOne: async ({ resource, id }) => {
    const response = await axiosInstance.get(`/${resource}/${id}`);
    return { data: response.data.data ?? response.data };
  },

  create: async ({ resource, variables }) => {
    const response = await axiosInstance.post(`/${resource}`, variables);
    return { data: response.data.data ?? response.data };
  },

  update: async ({ resource, id, variables }) => {
    const response = await axiosInstance.put(`/${resource}/${id}`, variables);
    return { data: response.data.data ?? response.data };
  },

  deleteOne: async ({ resource, id }) => {
    const response = await axiosInstance.delete(`/${resource}/${id}`);
    return { data: response.data.data ?? response.data };
  },

  getApiUrl: function (): string {
    throw new Error("Function not implemented.");
  },
};
