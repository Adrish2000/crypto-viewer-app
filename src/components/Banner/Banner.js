import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
    height:'80vh',
    backgroundSize: 'cover',
        
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 10,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Viewer
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "yellow",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            The Real Time Crypto Currency Viewer App
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
