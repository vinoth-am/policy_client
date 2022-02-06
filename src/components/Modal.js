import React, { useState } from "react";
import { message, Modal } from "antd";
import { Form, Select, InputNumber, Checkbox, Row, Col } from "antd";
import { booleanToIcon } from "../utils/utils";
import { UPDATE_POLICY } from "../utils/GQL";
import {
  FUEL,
  FUEL_PLACEHOLDER,
  GENERIC_ERROR,
  MODAL_TITLE,
  SEGMENT,
  SEGMENT_PLACEHOLDER,
} from "../utils/constants";
import { useMutation } from "@apollo/client";
const { Option } = Select;

export const UpdateModal = (props) => {
  const { data } = props;
  const [visible, setVisible] = useState(false);
  const [getData, setData] = useState({});
  const [getRequestData, setRequestData] = useState({});

  const resetState = () => {
    setData({});
    setRequestData({});
    setVisible(false);
  };

  const [updateInsurance] = useMutation(UPDATE_POLICY, {
    onCompleted: (data) => {
      try {
        const { updateInsurance } = data;
        if (updateInsurance.ok === true) {
          message.success(updateInsurance.success);
        } else {
          message.error(updateInsurance.error);
        }
      } catch (e) {
        message.error(GENERIC_ERROR);
      }
      resetState();
    },
  });

  const handleChange = (type, value) => {
    setRequestData({ ...getRequestData, [type]: value });
    setData({ ...getData, [type]: value });
  };

  const onSubmit = () => {
    updateInsurance({
      variables: { ...getRequestData, policyId: data.policyId },
    });
  };

  return (
    <>
      <a
        onClick={() => {
          setVisible(true);
          setData({ ...data });
        }}
      >
        Edit
      </a>
      <Modal
        title={MODAL_TITLE}
        visible={visible}
        onOk={() => onSubmit()}
        onCancel={() => setVisible(false)}
        width={800}
      >
        <Form
          name="update_data"
          initialValues={{
            fuel: getData.fuel,
            vehicleSegment: getData.vehicleSegment,
            premium: getData.premium,
          }}
        >
          <Row>
            <Col span={12}>
              <Form.Item>
                <span className="ant-form-text">
                  Policy Id : {getData.policyId}
                </span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <span className="ant-form-text">
                  Pruchase Date : {getData.datePurchase}
                </span>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item>
                <span className="ant-form-text">
                  Customer Id : {getData.customerId}
                </span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <span className="ant-form-text">
                  Gender : {getData.customerGender}
                </span>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item>
                <span className="ant-form-text">
                  Region : {getData.customerRegion}
                </span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <span className="ant-form-text">
                  Marital Status :{" "}
                  {booleanToIcon(getData.customerMaritalStatus)}
                </span>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item style={{ width: "50%" }} name="fuel" label="Fuel">
                <Select
                  placeholder={FUEL_PLACEHOLDER}
                  onChange={(value) => handleChange("fuel", value)}
                >
                  {FUEL.map((value, index) => (
                    <Option key={index} value={value.value}>
                      {value.key}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="vehicleSegment"
                label="Segment"
                style={{ width: "50%" }}
              >
                <Select
                  placeholder={SEGMENT_PLACEHOLDER}
                  onChange={(value) => handleChange("vehicleSegment", value)}
                >
                  {SEGMENT.map((value, index) => (
                    <Option key={index} value={value.value}>
                      {value.key}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="Premium">
                <Form.Item name="premium" noStyle>
                  <InputNumber
                    style={{ width: 150 }}
                    onChange={(value) => handleChange("premium", value)}
                    min={1}
                    // max={1000000}
                  />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Checkbox
                label="bodilyInjury"
                checked={getData.bodilyInjury}
                onChange={() =>
                  handleChange("bodilyInjury", !getData.bodilyInjury)
                }
                style={{
                  lineHeight: "32px",
                }}
              >
                Bodily Injury
              </Checkbox>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Checkbox
                checked={getData.personalInjuryProtection}
                onChange={() =>
                  handleChange(
                    "personalInjuryProtection",
                    !getData.personalInjuryProtection
                  )
                }
                style={{
                  lineHeight: "32px",
                }}
              >
                Injury Protection
              </Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox
                checked={getData.propertyDamageLiability}
                onChange={() =>
                  handleChange(
                    "propertyDamageLiability",
                    !getData.propertyDamageLiability
                  )
                }
                style={{
                  lineHeight: "32px",
                }}
              >
                Damage Liability
              </Checkbox>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Checkbox
                checked={getData.collision}
                onChange={() => handleChange("collision", !getData.collision)}
                style={{
                  lineHeight: "32px",
                }}
              >
                Collision
              </Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox
                checked={getData.comprehensive}
                onChange={() =>
                  handleChange("comprehensive", !getData.comprehensive)
                }
                style={{
                  lineHeight: "32px",
                }}
              >
                Comprehensive
              </Checkbox>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
