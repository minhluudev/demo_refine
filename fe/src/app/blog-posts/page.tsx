"use client";

import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

export default function BlogPostList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
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
      <Table {...tableProps} columns={columns} />
    </List>
  );
}
