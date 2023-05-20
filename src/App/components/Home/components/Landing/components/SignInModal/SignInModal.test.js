require("@jest/globals");
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { render, fireEvent, screen } from "@testing-library/react";
import "../../../../../../../i18n/i18n-config.js";

// Component
import SignInModal from "./SignInModal.js";
// store
import storeSignIn from "./store/storeSignIn.js";

describe("TEST OF COMPONENT : SignInModal", () => {
  storeSignIn.dispatch({ type: "sliceSignIn/actionSignInOpen" });
  const wrapper = shallow(
    <Provider store={storeSignIn}>
      <SignInModal />
    </Provider>
  );

  const modal = wrapper.find("componentSignInModal");
  const login = wrapper.find("fieldLogin");
  const password = wrapper.find("fieldPassword");
  const close = wrapper.find("buttonClose");
  const proceed = wrapper.find("buttonProceed");

  describe("Assessment of errors", () => {
    describe("When fields are empty", () => {
      test("then proceeding highlight erroneous fileds", () => {
        expect(login.props().value).toBe("");
        expect(password.props().value).toBe("");
      });
    });
  });
});
