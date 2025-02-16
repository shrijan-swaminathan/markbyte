import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useBlogData() {
  const [data, setData] = useState([]);

  const handleData = useCallback((newData) => {
    let transformedData = [];
    for (let i = 0; i < newData.length; i++) {
      const versions = newData[i].versions;
      const versionNumbers = versions.map((version) => version.version);
      const activeVersion = versions.find((version) => version.is_active);
      const date = activeVersion?.date_uploaded || null;

      transformedData.push({
        title: newData[i].title,
        date: date,
        link: `http://localhost:8080/static/${newData[i].title}.html`,
        latestVersion: newData[i].active_version || null,
        version: versionNumbers,
      });
    }
    setData(transformedData);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(() => {
    axios.get("http://localhost:8080/user/blog_posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      handleData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching blogger's blog posts:", error);
    });
  }, [handleData]);

  return { data, handleData, fetchData };
}

export default useBlogData;