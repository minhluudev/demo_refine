import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Category } from "@sdk/hey-api";
import { Modal, ModalProps, Spin } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

interface Props {
  modalProps: ModalProps;
  id?: number;
}

const DetailModal: React.FC<Props> = ({ modalProps, id }) => {
  const { result: record, query } = useShow<Category>({
    resource: "categories",
    id,
    queryOptions: {
      enabled: !!id,
    },
  });
  const { isLoading } = query;

  return (
    <Modal {...modalProps} title="Detail" footer={null}>
      <Spin spinning={isLoading}>
        <Title level={5}>{"ID"}</Title>
        <TextField value={record?.id} />
        <Title level={5}>{"Title"}</Title>
        <TextField value={record?.title} />
      </Spin>
    </Modal>
  );
};

export default DetailModal;
