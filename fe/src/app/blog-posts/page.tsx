"use client";

import SearchForm from "@components/blog-posts/SearchForm";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { Divider, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

export default function BlogPostList() {
  const { tableProps, searchFormProps } = useTable({
    // syncWithLocation: true,
    // filters: {
    // 	mode: 'server'
    // },
    onSearch: (params: any) => [
      {
        field: "title",
        operator: "eq",
        value: params.title ?? null,
      },
      {
        field: "category_id",
        operator: "eq",
        value: params.category_id ?? null,
      },
    ],
  });

  const columns: ColumnsType = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "title",
      dataIndex: "title",
      title: "Title",
    },
    {
      key: "action",
      title: "Action",
      render: (_, record: BaseRecord) => (
        <Space>
          <EditButton hideText size="small" recordItemId={record.id} />
          <ShowButton hideText size="small" recordItemId={record.id} />
          <DeleteButton hideText size="small" recordItemId={record.id} />
        </Space>
      ),
    },
  ];

  return (
    <List>
      <SearchForm searchFormProps={searchFormProps} />
      <Divider />
      <Table {...tableProps} columns={columns} loading={tableProps.loading} />
    </List>
  );
}
