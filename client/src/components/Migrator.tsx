import { FC, useState } from "react";
import SourceCard from "./SourceCard";
import View from "./View";
import DestinationCard from "./DestinationCard";
import { getBucketUploads, getUpload, modifyArray, pinCID } from "../utils";

const Migrator: FC = () => {
  const [uploadArray, setUploadArray] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [provider, setProvider] = useState<string>("web3storage");
  const [token, setToken] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [bucketName, setBucketName] = useState<string>("");
  const [bucketId, setBucketId] = useState<string>("");

  console.log(provider);

  const handleSubmit = async () => {
    setLoading(true);
    const response: any = await pinCID(
      accessToken,
      bucketName,
      provider,
      token
    );

    if (response.error) {
      setError(true);
    } else {
      setUploadArray(response);
    }

    setLoading(false);
  };

  const handleItemClick = async (uploadId: string) => {
    setLoading(true);
    const response: any = await getUpload(accessToken, uploadId);

    if (response.error) {
      setError(true);
    } else {
      if (response.status === "Pinned") {
        const updatedArray = modifyArray(uploadArray, uploadId, response, true);
        setUploadArray(updatedArray);
      } else {
        const updatedArray = modifyArray(
          uploadArray,
          uploadId,
          response,
          false
        );
        setUploadArray(updatedArray);
      }
    }

    setLoading(false);
  };

  const handleFetchBucketUploads = async (bucketId: string) => {
    setLoading(true);
    const response: any = await getBucketUploads(accessToken, bucketId);

    if (response.error) {
      setError(true);
    } else {
      setUploadArray(response);
    }

    setLoading(false);
  };

  return (
    <section className="px-16 py-10">
      <div className="bg-white flex gap-8 justify-center rounded p-6 shadow">
        <SourceCard
          provider={provider}
          setProvider={setProvider}
          token={token}
          setToken={setToken}
        />
        <DestinationCard
          bucketName={bucketName}
          setBucketName={setBucketName}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
        />
        <button
          className={`absolute top-1/3 mt-2 bg-orange-400 py-2 px-10 rounded text-white font-semibold flex gap-2 items-center ${
            provider && token && accessToken
              ? "cursor-pointer"
              : "cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!provider || !token || !accessToken}
        >
          SYNC{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            fill="white"
          >
            <path d="M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z" />
          </svg>
        </button>
      </div>
      <View
        loading={loading}
        uploadArray={uploadArray}
        error={error}
        handleItemClick={handleItemClick}
        bucketId={bucketId}
        setBucketId={setBucketId}
        handleFetchBucketUploads={handleFetchBucketUploads}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
      />
    </section>
  );
};

export default Migrator;
