import axios from "axios";

// Reducers
import appStore from "../../../../store/appStore.js";

async function apiTableSave(table) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/table/v1/save",
      table,
      {
        headers: {
          Authorization: "Bearer " + appStore.getState().userDetails.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default apiTableSave;
