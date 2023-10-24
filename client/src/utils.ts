export const pinCID = async (
  accessToken: string,
  bucketName: string,
  provider: string,
  token: string
) => {
  try {
    const response: any = await fetch(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/pin-cid`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: bucketName,
          provider,
          token,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.pinRes.uploads;
  } catch (error) {
    console.error("Error:", error);
    return { error };
  }
};

export const getUpload = async (accessToken: string, uploadId: string) => {
  try {
    const response: any = await fetch(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/get-upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uploadId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.uploadStatus;
  } catch (error) {
    console.error("Error:", error);
    return { error };
  }
};

export const getBucketUploads = async (
  accessToken: string,
  bucketId: string
) => {
  try {
    const response: any = await fetch(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/get-bucket-uploads`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bucketId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const bucketUploads = data.bucketUploads.map((uploadItem: any) => {
      const { id: uploadId, protocolLink, status } = uploadItem;

      return {
        uploadId,
        protocolLink,
        status,
      };
    });

    return bucketUploads;
  } catch (error) {
    console.error("Error:", error);
    return { error };
  }
};

export const modifyArray = (
  uploadArray: any[],
  uploadId: string,
  data: any,
  link: boolean
) => {
  const index = uploadArray.findIndex(
    (uploadItem: any) => uploadItem.uploadId === uploadId
  );

  const updatedArray = [...uploadArray];

  if (link) {
    updatedArray[index] = {
      ...updatedArray[index],
      status: data.status,
      protocolLink: data.protocolLink,
    };
  } else {
    updatedArray[index] = {
      ...updatedArray[index],
      status: data.status,
    };
  }

  return updatedArray;
};
