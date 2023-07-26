import axios from "axios";

// Reducers
import appStore from "../../../../../../../store/appStore";

async function SaveAPI(table) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/table/v2/save",
      table,
      {
        headers: {
          Authorization: "Bearer " + appStore.getState().sliceUserAuth.token,
        },
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export default SaveAPI;