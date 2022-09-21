import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      border: "1px solid black",
      borderRadius: 100,
      padding: 10,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "#FF5733 " : "#FBCEB1",
      color: selected ? "black" : "grey",
      fontWeight: selected ? 700 : 500,
      fontColor: "black",
      "&:hover": {
        backgroundColor: "#FF5733 ",
        color: "black",
      },
      width: "23%",
      textAlign: "center",
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
