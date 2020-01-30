import { withStyles } from "@material-ui/core/styles";
import MaterialUIButton from "@material-ui/core/Button";

const Button = withStyles({
  root: {
    color: "white",
    backgroundColor: "#0b0b0b",
    fontFamily: "Assistant",
    textTransform: "lowercase",
    border: "2px solid #0b0b0b",
    fontSize: "24px",
    fontWeight: "600",
    width: "200px",
    "&:hover": {
      backgroundColor: "#0b0b0b",
      color: "white",
      borderColor: "#FBCE39"
    }
  }
})(MaterialUIButton);

export default Button;
