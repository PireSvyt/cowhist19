import axios from "axios";

async function apiPseudo(pseudoInput) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/v1/existingpseudo",
      pseudoInput
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiPseudo;
