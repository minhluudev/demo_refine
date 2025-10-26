import { Breadcrumb, PageHeader, SaveButton, useForm } from "@refinedev/antd";
import { zCategoryRequest } from "@sdk/hey-api/zod.gen";
import { zodRule } from "@utils/helper";
import { Form, Input, Divider, Flex, Button } from "antd";
import { useRouter } from "next/navigation";

interface Props {
  formType?: "CREATE" | "UPDATE";
}

const CategoryEditForm: React.FC<Props> = ({ formType = "CREATE" }) => {
  const router = useRouter();
  const { formProps, saveButtonProps } = useForm({
    redirect: "show",
  });

  return (
    <>
      <PageHeader
        title={formType === "CREATE" ? "Create Category" : "Update category"}
        onBack={() => router.back()}
        breadcrumb={<Breadcrumb />}
      />
      <Form
        {...formProps}
        layout="vertical"
        style={{ background: "white", padding: 20, borderRadius: 10 }}
      >
        <Form.Item
          label="Title"
          name="title"
          required
          rules={[zodRule(zCategoryRequest.shape.title)]}
        >
          <Input />
        </Form.Item>
        <Divider />
        <Flex justify="end" gap={8}>
          <Button htmlType="reset">Reset</Button>
          <SaveButton {...saveButtonProps} />
        </Flex>
      </Form>
    </>
  );
};

export default CategoryEditForm;
