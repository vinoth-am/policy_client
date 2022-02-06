import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";

export const isValidArray = (array) => {
  return Array.isArray(array) && array.length > 0;
};

export const booleanToIcon = (value) => {
  if (value) {
    return <CheckCircleTwoTone twoToneColor="#52c41a" />;
  }
  return <CloseCircleTwoTone twoToneColor="red" />;
};

export const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
