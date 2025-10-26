import {
  Breadcrumb,
  PageHeader,
  SaveButton,
  useForm,
  useSelect,
} from "@refinedev/antd";
import { zPostRequest } from "@sdk/hey-api/zod.gen";
import { zodRule } from "@utils/helper";
import { Button, Divider, Flex, Form, Input, Select, Spin } from "antd";
import { useRouter } from "next/navigation";

interface Props {
  formType?: "CREATE" | "UPDATE";
}

const PostEditForm: React.FC<Props> = ({ formType }) => {
  const router = useRouter();
  const { formProps, saveButtonProps, query } = useForm({
    redirect: "show",
  });

  const blogPostsData = query?.data?.data;

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    defaultValue: blogPostsData?.category?.id,
  });

  return (
    <>
      <PageHeader
        title={formType === "CREATE" ? "Create post" : "Update post"}
        onBack={() => router.back()}
        breadcrumb={<Breadcrumb />}
      />
      <Spin spinning={query?.isLoading}>
        <Form
          {...formProps}
          layout="vertical"
          style={{ background: "white", padding: 20, borderRadius: 10 }}
        >
          <Form.Item
            label="Title"
            name="title"
            required
            rules={[zodRule(zPostRequest.shape.title)]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[zodRule(zPostRequest.shape.content)]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category_id"
            required
            rules={[zodRule(zPostRequest.shape.category_id)]}
          >
            <Select {...categorySelectProps} />
          </Form.Item>
          <Form.Item
            label="Tags"
            name="tags"
            rules={[zodRule(zPostRequest.shape.tags)]}
          >
            <Select mode="tags" />
          </Form.Item>
          <Divider />
          <Flex justify="end" gap={8}>
            <Button htmlType="reset">Reset</Button>
            <SaveButton {...saveButtonProps} />
          </Flex>
        </Form>
      </Spin>
    </>
  );
};

export default PostEditForm;
