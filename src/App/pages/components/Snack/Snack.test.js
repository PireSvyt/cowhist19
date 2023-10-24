require("@jest/globals");
import { render, fireEvent, screen } from "@testing-library/react";
import Snack from "./Snack2.js";
import { random_id } from "../../services/toolkit.js";

describe.skip("TEST OF COMPONENT : Snack", () => {
  const newData = {
    uid: random_id(),
    id: "generic.snack.error.withdetails",
    details: ["detail.1", "detail.2"],
  };
  render(<Snack data={newData} />);
  const snackbar = screen.getByTestId("snackbar");
  const alert = screen.getByTestId("alert");

  describe("Assessment of rendered state", () => {
    describe("When snack opens", () => {
      test("then the open is true", () => {
        expect(snackbar.props().open).toBeTruthy();
      });
    });
  });
});
