import { useSelect } from "@refinedev/antd";
import { Select, Spin } from "antd";
import { SelectProps } from "antd/lib";
import { useState } from "react";

type PropsType = {
  defaultValue?: number;
} & Omit<SelectProps, "options">;

const CategorySelect: React.FC<PropsType> = ({ defaultValue, ...rest }) => {
  const [isActiveFetchData, setIsActiveFetchData] = useState(false);

  const { selectProps: categorySelectProps, query } = useSelect({
    resource: "categories",
    optionLabel: "title",
    optionValue: "id",
    defaultValue,
    debounce: 1500, // 1.5s
    queryOptions: {
      enabled: isActiveFetchData,
    },
    pagination: {
      pageSize: 10,
    },
  });

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;

    if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 10) {
      // Fetching next page
    }
  };

  return (
    <Select
      {...categorySelectProps}
      {...rest}
      showSearch
      notFoundContent={query.isLoading ? <Spin size="small" /> : null}
      onFocus={() => setIsActiveFetchData(true)}
      onPopupScroll={handleScroll}
    />
  );
};

export default CategorySelect;
