import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Table } from "reactstrap";

const Calculator = () => {
  const [accountSize, setAccountSize] = useState(10000);
  const [portfolioRisk, setPortfolioRisk] = useState(2);
  const [riskRatio, setRiskRatio] = useState(2);
  const [entryPrice, setEntryPrice] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);
  const [stockAmount, setStockAmount] = useState(0);
  const [calculated, setCalculated] = useState(false);
  const [targetPrice, setTargetPrice] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  useEffect(() => {
    console.log(`Account size: ${accountSize}`);
    console.log(`Risk per trade: ${portfolioRisk}`);
    console.log(`Risk return ratio: ${riskRatio}`);
    console.log(`Entry price: ${entryPrice}`);
    console.log(`Stop-loss price: ${stopLoss}`);
  });

  const calcStockAmount = () => {
    if (entryPrice <= 0) {
      setCalculated(false);
    } else {
      let singleRisk = entryPrice - stopLoss; // 1 aktsia kaotuse summa
      let totalRiskSum = accountSize * (portfolioRisk / 100); // lubatud kaotuse summa
      let result = Math.floor(totalRiskSum / singleRisk); // kogus aktsiaid, mida osta, et säilitada portfolio riskitauvus

      setStockAmount(result);

      setTargetPrice(entryPrice + riskRatio * singleRisk);
      setTotalLoss(result * singleRisk);
      setTotalProfit(result * riskRatio * singleRisk);

      setCalculated(true);
    }
  };

  const SumTable = () => {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Allowed quantity</th>
            <th>Entry Price</th>
            <th>Target Price</th>
            <th>Stop-Loss</th>
            <th>Total Profit</th>
            <th>Potential Loss</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{stockAmount}</td>
            <td>{entryPrice}</td>
            <td>{targetPrice}</td>
            <td>{stopLoss}</td>
            <td>{totalProfit}</td>
            <td>{totalLoss}</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="accountSize">Portfolio Size</Label>
          <Input
            type="number"
            name="accountSize"
            id="accountSize"
            placeholder="10 000"
            onChange={(e) => setAccountSize(parseInt(e.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <Label for="portfolioRisk">Risk Per Trade (%)</Label>
          <Input
            type="select"
            name="portfolioRisk"
            id="portfolioRisk"
            value={2}
            onChange={(e) => setPortfolioRisk(parseInt(e.target.value))}>
            <option>1</option>
            <option>1.5</option>
            <option>2</option>
            <option>2.5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="riskReturnRatio">Risk return ratio (R)</Label>
          <Input
            type="select"
            name="riskReturnRatio"
            id="riskReturnRatio"
            value={2}
            onChange={(e) => setRiskRatio(parseInt(e.target.value))}>
            <option>1.5</option>
            <option>2</option>
            <option>2.5</option>
            <option>3</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="entryPrice">Entry price</Label>
          <Input
            type="number"
            name="entryPrice"
            id="entryPrice"
            placeholder="0"
            onChange={(e) => setEntryPrice(parseInt(e.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <Label for="stopLoss">Stop-loss price</Label>
          <Input
            type="number"
            name="stopLoss"
            id="stopLoss"
            placeholder="0"
            onChange={(e) => setStopLoss(parseInt(e.target.value))}
          />
        </FormGroup>
      </Form>
      <Button onClick={() => calcStockAmount()}>Calculate</Button>
      <div className="mt-4">{calculated ? <SumTable /> : <div></div>}</div>
    </div>
  );
};

export default Calculator;
