import CategorySelect from "@components/common/CategorySelect";
import { Button, Flex, Form, Space } from "antd";
import Input from "antd/es/input/Input";
import { FormProps } from "antd/lib";

interface Props {
  searchFormProps: FormProps<unknown>;
}

const SearchForm: React.FC<Props> = ({ searchFormProps }) => {
  return (
    <Form {...searchFormProps} layout="vertical">
      <Flex gap={8}>
        <Form.Item name="title" style={{ marginBottom: 0 }}>
          <Input placeholder="Title" allowClear style={{ width: 200 }} />
        </Form.Item>
        <Form.Item name="category_id" style={{ marginBottom: 0 }}>
          <CategorySelect
            placeholder="Category"
            defaultFetchData={searchFormProps.form?.getFieldValue(
              "category_id"
            )}
            style={{ width: 200 }}
          />
        </Form.Item>
        <Space>
          <Button htmlType="reset">Reset</Button>
          <Button type="primary" onClick={searchFormProps.form?.submit}>
            Search
          </Button>
        </Space>
      </Flex>
    </Form>
  );
};

export default SearchForm;
