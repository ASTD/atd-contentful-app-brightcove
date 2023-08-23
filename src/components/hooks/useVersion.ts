import { useState, useEffect } from "react";
import axios from "axios";

const useVersion = (sdk: any) => {
  const [version, setVersion] = useState<number>();

  useEffect(() => {
    axios
      .get(
        `https://api.contentful.com/spaces/${sdk.ids["space"]}/environments/${sdk.ids["environment"]}/entries/${sdk.ids["entry"]}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_CMA_TOKEN}`,
          },
        }
      )
      .then((res) => setVersion(res.data["sys"]["version"]))
      .catch((err) => console.log(err));
  });

  return version;
};

export default useVersion;
