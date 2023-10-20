require("dotenv").config();
const axios = require("axios");

let apiURL = process.env.TESTSUITE_SERVER_URL;

// TESTED
export async function apiAuthSignUp (signUpInputs) {
  try {
    const res = await axios.post(apiURL + "auth/v1/signup", signUpInputs);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export async function apiAuthSendActivation (sendActivationInputs) {
  try {
    const res = await axios.post(
      apiURL + "auth/v1/sendactivation",
      sendActivationInputs,
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

// TESTED
export async function apiAuthActivate (activateInputs) {
  try {
    const res = await axios.post(apiURL + "auth/v1/activate", activateInputs);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

// TESTED
export async function apiAuthSignIn (signInInputs) {
  try {
    const res = await axios.post(apiURL + "auth/v1/signin", signInInputs);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export async function apiAuthAssess (token) {
  try {
    const res = await axios.post(apiURL + "auth/v1/assess", { token: token });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export async function apiAuthSendPassword (sendPasswordInputs) {
  try {
    const res = await axios.post(
      apiURL + "auth/v1/sendpassword",
      sendPasswordInputs,
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export async function apiAuthExistingPseudo (existingPseudoInput) {
  try {
    const res = await axios.post(
      apiURL + "auth/v1/existingpseudo",
      existingPseudoInput,
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
