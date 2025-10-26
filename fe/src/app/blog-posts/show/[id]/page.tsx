"use client";

import { DateField, MarkdownField, Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Post } from "@sdk/hey-api";
import { Tag, Typography } from "antd";

const { Title } = Typography;

export default function BlogPostShow() {
  const { result: record, query } = useShow<Post>({});
  const { isLoading } = query;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <Typography>{record?.id}</Typography>
      <Title level={5}>{"Title"}</Title>
      <Typography>{record?.title}</Typography>
      <Title level={5}>{"Content"}</Title>
      <Typography>{record?.content}</Typography>
      <Title level={5}>{"Category"}</Title>
      <Typography>{record?.category?.title}</Typography>
      <Title level={5}>{"Tags"}</Title>
      {record?.tags?.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </Show>
  );
}
