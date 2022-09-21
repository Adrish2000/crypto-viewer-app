import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {Container,createTheme,TableCell,LinearProgress,ThemeProvider,Typography,TextField,TableBody,TableRow,TableHead,TableContainer,Table,Paper,} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [search, setSearch] = useState(""); //used for searching the coin using its name or symbol
  const [page, setPage] = useState(1);

  const { symbol, coins, loading } = CryptoState();

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#FBCEB1",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#B22222",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "black",
      },
    },
  });

  const classes = useStyles();
  const history = useHistory();

  
   //for handling the search and reruning the filtered coin only
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||     //comapring with name as well as symbol.....btc or bitcoin
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Serif",color:"black" }}
        >
          Cryptocurrency Concurrent Prices
        </Typography>
        <TextField
          label="Search for the coin"
          variant="filled"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)} //setting value of search state
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "yellow" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#B22222" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "left" : "right"} //giving more space to the coin
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead> 

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)//1 to
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}//clicking on any particular coin takes us to that coin
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6) //removing last six digits and placing M(million)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        //to avoid infinite list of coins
        
        <Pagination
        
          count={parseInt((handleSearch()?.length / 10).toFixed(0))} //total=100 elements/10=10 pages in total and offcourse no fraction
          style={{
            padding: 20,
            variant:"outlined",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}//ul refers to the list of items-1,2,3,.....
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450); //scrolling the page to top(450pixel)
          }}
        />
        </Container>
  );
}
