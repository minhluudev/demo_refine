"use client";

import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import DetailModal from "@components/categories-v2/DetailModal";
import FormModal from "@components/categories-v2/FormModal";
import {
  EditButton,
  List,
  SaveButton,
  TextField,
  useEditableTable,
  useModal,
  useModalForm,
} from "@refinedev/antd";
import { Button, Divider, Form, Input, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

export default function CategoryList() {
  const [idDetailSelected, setIdDetailSelected] = useState<number>();
  const {
    tableProps,
    formProps,
    saveButtonProps,
    cancelButtonProps,
    isEditing,
    editButtonProps,
    setFilters,
  } = useEditableTable({
    resource: "categories",
    // autoSubmitClose: false,
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: onOpenCreateModal,
  } = useModalForm({
    resource: "categories",
    action: "create",
    redirect: false,
    autoSubmitClose: true,
  });

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: onOpenEditModal,
  } = useModalForm({
    resource: "categories",
    action: "edit",
    redirect: false,
    autoSubmitClose: true,
  });

  const { show: onOpenDetailModal, modalProps: detailModalProps } = useModal();

  const columns: ColumnsType = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      width: 70,
    },
    {
      key: "title",
      dataIndex: "title",
      title: "Title",
      render: (value, record) => {
        if (isEditing(record.id)) {
          return (
            <Form.Item name="title" style={{ margin: 0 }}>
              <Input />
            </Form.Item>
          );
        }

        return <TextField value={value} />;
      },
    },
    {
      key: "action",
      dataIndex: "title",
      title: "Action",
      width: 200,
      render: (_, record) => {
        if (isEditing(record.id)) {
          return (
            <Space>
              <SaveButton {...saveButtonProps} size="small">
                Save
              </SaveButton>
              <Button {...cancelButtonProps} size="small">
                Cancel
              </Button>
            </Space>
          );
        }
        return (
          <Space>
            <EditButton {...editButtonProps(record.id)} size="small">
              Edit Inline
            </EditButton>
            <Button
              onClick={() => onOpenEditModal(record.id)}
              size="small"
              icon={<EditOutlined />}
            >
              Edit Modal
            </Button>
            <Button
              onClick={() => {
                setIdDetailSelected(record.id);
                onOpenDetailModal();
              }}
              size="small"
              icon={<EyeOutlined />}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <List createButtonProps={{ onClick: () => onOpenCreateModal() }}>
      <FormModal modalProps={createModalProps} formProps={createFormProps} />
      <FormModal modalProps={editModalProps} formProps={editFormProps} />
      <DetailModal modalProps={detailModalProps} id={idDetailSelected} />
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
      <Form {...formProps}>
        <Table
          {...tableProps}
          columns={columns}
          loading={tableProps.loading}
          rowKey="id"
        />
      </Form>
    </List>
  );
}
