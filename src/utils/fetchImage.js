import { useEffect, useState } from "react";

const useFetchImage = (edit, imageUrl) => {
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(imageUrl);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.arrayBuffer();

        const urlObject = new URL(imageUrl);
        const pathSegments = urlObject?.pathname?.split("/");

        // Create a Blob with the binary data
        const blob = new Blob([data]);

        // Create a File using the Blob and set it in the state
        const fileName = pathSegments[pathSegments?.length - 1]; // Replace with the desired file name

        const filtType = fileName?.split(".");

        const file = new File([blob], fileName, {
          type: `image/${filtType[filtType?.length - 1]}`,
        });

        setFileData(file);
      } catch (error) {
        console.error("Error fetching binary data:", error);
      } finally {
      }
    };

    if (edit && imageUrl) {
      fetchData();
    }
  }, [edit, imageUrl]);

  return fileData;
};
export default useFetchImage;
