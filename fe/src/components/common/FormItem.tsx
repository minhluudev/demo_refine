import { Form } from "antd";

interface FormItemProps {
  label?: string | React.ReactNode;
  name?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormItem: React.FC<FormItemProps> = (props) => {
  const { children, ...rest } = props;

  return <Form.Item {...rest}>{children}</Form.Item>;
};

export default FormItem;
