import React, { useState } from "react";
import { Input, Spin, message, Button } from "antd";
import { Table } from "antd";
import { useLazyQuery } from "@apollo/client";
import { GET_POLICY_DETAILS } from "../../utils/GQL";

import { booleanToIcon, isValidArray, loadingIcon } from "../../utils/utils";
import {
  GENERIC_ERROR,
  NO_DATA,
  SEARCH_PLACEHOLDER,
} from "../../utils/constants";

import "./home.css";
import { UpdateModal } from "../../components/Modal";


const { Search } = Input;

const columns = [
  {
    title: "Policy Id",
    width: 80,
    dataIndex: "policyId",
    key: "policyId",
  },
  {
    title: "Date Purchase",
    width: 100,
    dataIndex: "datePurchase",
    key: "datePurchase",
  },
  {
    title: "Customer ID",
    dataIndex: "customerId",
    key: "customerId",
    width: 100,
  },
  {
    title: "Fuel",
    dataIndex: "fuel",
    key: "fuel",
    width: 100,
  },
  {
    title: "Segment",
    dataIndex: "vehicleSegment",
    key: "vehicleSegment",
    width: 90,
  },
  {
    title: "Premium",
    dataIndex: "premium",
    key: "premium",
    width: 100,
  },
  {
    title: "Injury",
    dataIndex: "bodilyInjury",
    key: "bodilyInjury",
    width: 80,
    render: (value) => booleanToIcon(value),
  },
  {
    title: "Protection",
    dataIndex: "personalInjuryProtection",
    key: "personalInjuryProtection",
    width: 80,
    render: (value) => booleanToIcon(value),
  },
  {
    title: "Liability",
    dataIndex: "propertyDamageLiability",
    key: "propertyDamageLiability",
    width: 90,
    render: (value) => booleanToIcon(value),
  },
  {
    title: "Collision",
    dataIndex: "collision",
    key: "collision",
    width: 90,
    render: (value) => booleanToIcon(value),
  },
  {
    title: "Comprehensive",
    dataIndex: "comprehensive",
    key: "comprehensive",
    width: 100,
    render: (value) => booleanToIcon(value),
  },
  {
    title: "Gender",
    dataIndex: "customerGender",
    key: "customerGender",
    width: 80,
  },
  {
    title: "Income",
    dataIndex: "customerIncomeGroup",
    key: "customerIncomeGroup",
    width: 120,
  },
  {
    title: "Region",
    dataIndex: "customerRegion",
    key: "customerRegion",
    width: 80,
  },
  {
    title: "Marital",
    dataIndex: "customerMaritalStatus",
    key: "customerMaritalStatus",
    width: 80,
    render: (value) => booleanToIcon(value),
  },

  {
    title: "Edit",
    key: "edit",
    fixed: "right",
    width: 100,

    render: (_, record) => <UpdateModal data={record} />,
  },
];

function Home() {
  const [getData, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [getPolicy, { loading }] = useLazyQuery(GET_POLICY_DETAILS, {
    onCompleted: (data) => {
      try {
        const { searchInsurance } = data;
        if (isValidArray(searchInsurance)) {
          setData([...searchInsurance]);
        }
      } catch (e) {
        message.error(GENERIC_ERROR);
      }
    },
  });

  const onSearch = (data) => {
    if (data !== "") {
      getPolicy({ variables: { search: data } });
    }
  };

  const onReset = () => {
    setData([]);
    setInputValue("");
  };

  return (
    <>
      <div className="search-container" style={{ display: "flex" }}>
        <Search
          className="search"
          placeholder={SEARCH_PLACEHOLDER}
          enterButton="Search"
          size="large"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.replace(/ /g, ""))}
          onSearch={onSearch}
        />
        <Button danger size="large" onClick={onReset}>
          Reset
        </Button>
      </div>

      <Table
        locale={{ emptyText: NO_DATA }}
        rowKey={(record) => record.policyId}
        pagination={{ position: ["bottomRight"] }}
        loading={{
          indicator: <Spin indicator={loadingIcon} />,
          spinning: loading,
        }}
        columns={columns}
        dataSource={getData}
        scroll={{ x: 1500 }}
      />
    </>
  );
}

export default Home;
