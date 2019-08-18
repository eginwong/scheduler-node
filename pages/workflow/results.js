import React from "react";
import PropTypes from "prop-types";
import { CapCase } from "../../src/utils/string.utils";

import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import "../../static/styles/results.scss";

export default function ResultsDialog(props) {
  const setFullWidth = true;
  const maxWidthDim = "md";

  const { onClose, scheduleDate, emailHref, open } = props;
  const DATE_OPTIONS = { year: "numeric", month: "long", day: "numeric" };

  const results = props.results ? props.results : [];

  // timezone fix: https://stackoverflow.com/a/14569783
  const dateType = new Date(scheduleDate);

  function handleClose(val) {
    onClose(val);
  }

  return (
    <Dialog
      fullWidth={setFullWidth}
      maxWidth={maxWidthDim}
      onClose={() => handleClose("Cancel")}
      aria-labelledby="results-dialog"
      open={open}
    >
      <DialogTitle className="results__title">
        <span>
          Proposed Schedule for{" "}
          {dateType.toLocaleDateString("en-US", DATE_OPTIONS)}
        </span>
        <span>
          <CloseIcon onClick={() => handleClose("Cancel")} />
        </span>
      </DialogTitle>
      <DialogContent dividers={true} className="results__container">
        {results.map((res, i) => (
          <Card key={"card" + i} className="results__container__card">
            <CardContent
              key={"cardContent" + i}
              className="results__container__card__content"
            >
              <h4 className="results__container__card__content--role">
                {CapCase(res.role)}
              </h4>
              <h6>{CapCase(res.member)}</h6>
            </CardContent>
          </Card>
        ))}
      </DialogContent>
      <DialogActions className="results__actions">
        <Button onClick={() => handleClose("SendEmail")} color="primary">
          <a href={emailHref}>Share</a>
        </Button>
        <Button onClick={() => handleClose("SaveSession")} color="primary">
          Save Session
        </Button>
        <Button onClick={() => handleClose("SaveHistory")} color="primary">
          Complete Session
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ResultsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  results: PropTypes.array.isRequired
};
