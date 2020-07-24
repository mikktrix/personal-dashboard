import React, { useState } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";

/* const TickerResult = () => {
  return (
    <Card>
      <CardHeader tag="h3">{tickerResult["01. symbol"]}</CardHeader>
      <CardBody>
        <CardTitle>Special Title Treatment</CardTitle>
        <CardText>
          With supporting text below as a natural lead-in to additional content.
        </CardText>
        <Button>Go somewhere</Button>
      </CardBody>
      <CardFooter className="text-muted">Footer</CardFooter>
    </Card>
  );
}; */

const StockQuote = () => {
  const [ticker, setTicker] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [tickerResult, setTickerResult] = useState("");

  const apiKey = "L5WU1NFSXSQLL85Q";
  const query = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`;

  const handleSubmit = () => {
    setLoaded(false);
    axios
      .get(query)
      .then((res) => {
        if (!res.data["Global Quote"]) return;
        else if (!res.data["Global Quote"]["01. symbol"]) return;
        else {
          console.log(res.data["Global Quote"]);
          setTickerResult(res.data["Global Quote"]);
          setLoaded(true);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="ticker">Search Ticker</Label>
          <Input
            type="text"
            name="ticker"
            id="ticker"
            placeholder="Enter a stock ticker"
            onChange={(e) => setTicker(e.target.value)}
          />
        </FormGroup>
        <Button onClick={() => handleSubmit()}>Submit</Button>
      </Form>
      {loaded ? (
        <Card className="my-4">
          <CardHeader tag="h3">{tickerResult["01. symbol"]}</CardHeader>
          <CardBody>
            <CardTitle>Price</CardTitle>
            <CardText>{tickerResult["05. price"]}</CardText>
            <a
              href={`https://finance.yahoo.com/quote/${ticker}`}
              target="_blank"
              rel="noopener noreferrer">
              <Button>Open in Yahoo Finance</Button>
            </a>
          </CardBody>
        </Card>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default StockQuote;
