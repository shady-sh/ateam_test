import { Divider, FormControlLabel, Switch } from "@mui/material";
import axios from "axios";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import {
  Col,
  Container,
  DropdownButton,
  Form,
  Row,
  Button,
} from "react-bootstrap";
import { ConsultButton } from "../components/Buttons";
import Empty from "../components/Empty";

interface IState {
  content: string;
  selected: boolean;
}

const initialProcessMethod = [
  { content: "밀링", selected: false },
  { content: "선반", selected: false },
];
const initialMaterials = [
  { content: "알루미늄", selected: false },
  { content: "탄소강", selected: false },
  { content: "구리", selected: false },
  { content: "합금강", selected: false },
  { content: "강철", selected: false },
  { content: "조건테스트", selected: false },
];

const Main: FC = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [filterData, setFilterData] = useState<Array<any>>([]);

  const [methodNumber, setMethodNumber] = useState<number>(0);
  const [processMethod, setProcessMethod] = useState<Array<IState>>([
    ...initialProcessMethod,
  ]);
  const [materialNumber, setMaterialNumber] = useState<number>(0);
  const [materials, setMaterials] = useState<Array<IState>>([
    ...initialMaterials,
  ]);
  const [consult, setConsult] = useState<boolean>(false);

  /**
   * 가공 방식부분 선택 이벤트 핸들러
   */
  const onChangeProcessMethodSelect = async (indexNumber: number) => {
    let concatProcessMethod = processMethod.concat();
    concatProcessMethod[indexNumber].selected =
      !concatProcessMethod[indexNumber].selected;
    setProcessMethod(concatProcessMethod);
  };

  /**
   * 재료 선택 이벤트 핸들러
   */
  const onChangeMaterialSelect = async (indexNumber: number) => {
    let concatMaterials = materials.concat();
    concatMaterials[indexNumber].selected =
      !concatMaterials[indexNumber].selected;
    setMaterials(concatMaterials);
  };

  /**
   * 필터링 리셋
   */
  const resetMainState = async () => {
    initialProcessMethod.map((v) => (v.selected = false));
    initialMaterials.map((v) => (v.selected = false));
    setProcessMethod([...initialProcessMethod]);
    setMaterials([...initialMaterials]);
  };

  /**
   * 필터링 실행 함수
   */
  const executeFilterData = async () => {
    if (data && data.length > 0) {
      let concatData = data.concat();
      const methodContent: string[] = [];
      const materialContent: string[] = [];
      if (methodNumber > 0) {
        processMethod.map((v) => v.selected && methodContent.push(v.content));
        concatData = concatData.filter((v) =>
          methodContent.some((val: string) => v.method.includes(val))
        );
      }
      if (materialNumber > 0) {
        materials.map((v) => v.selected && materialContent.push(v.content));
        concatData = concatData.filter((v) =>
          materialContent.some((val: string) => v.material.includes(val))
        );
      }
      if (consult) {
        concatData = concatData.filter((v) => v.status === "상담중");
      }
      setFilterData(concatData);
    }
  };

  useLayoutEffect(() => {
    axios
      .get("http://localhost:5000/requests")
      .then((res) => setData(res?.data));
  }, []);

  useEffect(() => {
    async function counting() {
      let methodCount: number = 0;
      let materialCount: number = 0;
      processMethod.concat().forEach((v) => v.selected && methodCount++);
      materials.concat().forEach((v) => v.selected && materialCount++);
      setMethodNumber(methodCount);
      setMaterialNumber(materialCount);
      setConsult(false);
    }
    counting();
  }, [processMethod, materials]);

  useEffect(() => {
    executeFilterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methodNumber, materialNumber, consult, data]);

  return (
    <Container className="main">
      <div className="title">
        <h2>들어온 요청</h2>
        <div>파트너님에게 딱맞는 요청서를 찾아보세요.</div>
      </div>
      <div className="select-dropdown">
        <DropdownButton
          title={methodNumber > 0 ? `가공방식(${methodNumber})` : "가공방식"}
          variant="outline-secondary"
          className={methodNumber > 0 ? "fill-color" : ""}
        >
          {processMethod?.map((v, i) => (
            <div className="dropdown-item" key={i}>
              <Form.Check
                type="checkbox"
                checked={v?.selected}
                onChange={() => onChangeProcessMethodSelect(i)}
              />
              {v.content}
            </div>
          ))}
        </DropdownButton>
        <DropdownButton
          title={materialNumber > 0 ? `재료(${materialNumber})` : "재료"}
          variant="outline-secondary"
          className={materialNumber > 0 ? "fill-color" : ""}
        >
          {materials?.map((v, i) => (
            <div className="dropdown-item" key={i}>
              <Form.Check
                type="checkbox"
                checked={v?.selected}
                onChange={() => onChangeMaterialSelect(i)}
              />
              {v.content}
            </div>
          ))}
        </DropdownButton>
        <span className="filter-reset" onClick={resetMainState}>
          <img src="img/refresh.png" alt="refresh" />
          <span>필터링 리셋</span>
        </span>
        <FormControlLabel
          className="consult"
          control={
            <Switch
              checked={consult}
              onChange={() => setConsult(!consult)}
              name="상담 요청"
              color="primary"
            />
          }
          label="상담 중인 요청만 보기"
        />
      </div>
      <Row className="item-list">
        {filterData?.length > 0 ? (
          filterData.map((v, i) => {
            const {
              title,
              client,
              due,
              count,
              docs,
              amount,
              method,
              material,
              status,
            } = v;
            return (
              <Col className="mb-2" sm={4} key={i}>
                <div className="item-card">
                  <div className="item-card-title">
                    <span>{title}</span>
                    <ConsultButton status={status} />
                  </div>
                  <div className="item-customer">{client}</div>
                  <div className="item-date">{due}까지 납기</div>
                  <Divider sx={{ margin: "16px 0 32px 0" }} />
                  <div className="item-description mb-1">
                    <span>도면개수</span>
                    <span>{count ? count : docs}개</span>
                  </div>
                  <div className="item-description mb-1">
                    <span>총 수량</span>
                    <span>{amount}개</span>
                  </div>
                  <div className="item-description mb-1">
                    <span>가공 방식</span>
                    <span>{method?.join().replaceAll(",", ", ")}</span>
                  </div>
                  <div className="item-description mb-1">
                    <span>재료</span>
                    <span>{material?.join().replaceAll(",", ", ")}</span>
                  </div>
                  <div className="item-buttons mt-4 pt-1">
                    <Button variant="primary">요청 내역 보기</Button>
                    <Button
                      style={{ marginLeft: "8px" }}
                      variant="outline-primary"
                    >
                      채팅하기
                    </Button>
                  </div>
                </div>
              </Col>
            );
          })
        ) : (
          <Empty />
        )}
      </Row>
    </Container>
  );
};

export default Main;
