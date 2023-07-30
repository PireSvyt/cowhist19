import axios from "axios";

// Reducers
import appStore from "../../../../../../../store/appStore";

async function CreateAPI(table) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/table/v1/create",
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

export default CreateAPI;
