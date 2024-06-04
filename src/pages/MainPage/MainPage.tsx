import React, { useEffect, useState } from "react";
import Table from "./Table";

const MainPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/data")
      .then(response => response.json())
      // @ts-ignore
      .then(data => {
        console.log({ data });
        setData(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  console.log({ data });
  return (
    <div>
      MainPage
      <Table />
    </div>
  );
};

export default MainPage;
