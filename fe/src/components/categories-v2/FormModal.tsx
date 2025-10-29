import { SaveButton } from "@refinedev/antd";
import { zCategoryRequest } from "@sdk/hey-api/zod.gen";
import { zodRule } from "@utils/helper";
import { Button, Divider, Flex, Form, Input, Modal, ModalProps } from "antd";
import { FormProps } from "antd/lib";

interface Props {
  formProps: FormProps<{}>;
  modalProps: ModalProps;
}

const FormModal: React.FC<Props> = ({ formProps, modalProps }) => {
  return (
    <Modal {...modalProps} footer={null}>
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
          <SaveButton htmlType="submit" onClick={formProps.form?.submit} />
        </Flex>
      </Form>
    </Modal>
  );
};

export default FormModal;
