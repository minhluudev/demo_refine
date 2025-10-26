"use client";

import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Divider, Input, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

export default function CategoryList() {
  const { tableProps, setFilters } = useTable({
    // syncWithLocation: true,
    // filters: {
    //   mode: "server",
    // },
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
      <Input.Search
        placeholder="Tìm bài viết..."
        allowClear
        onSearch={(value) => {
          console.log(value);
          setFilters([
            {
              field: "title",
              operator: "eq",
              value,
            },
          ]);
        }}
        style={{ width: 300 }}
      />
      <Divider />
      <Table {...tableProps} columns={columns} loading={tableProps.loading} />
    </List>
  );
}
