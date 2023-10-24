import { FC } from "react";

interface IView {
  loading: boolean;
  uploadArray: {
    uploadId: string;
    cid?: string;
    protocolLink?: string;
    status?: string;
  }[];
  error?: boolean;
  handleItemClick: (uploadId: string) => void;
  bucketId: string;
  setBucketId: (bucketId: string) => void;
  handleFetchBucketUploads: (bucketId: string) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const View: FC<IView> = ({
  loading,
  uploadArray,
  error,
  handleItemClick,
  bucketId,
  setBucketId,
  handleFetchBucketUploads,
  accessToken,
  setAccessToken,
}) => {
  return (
    <div className="bg-white rounded p-6 shadow mt-4">
      <h2 className="bg-blue-100 py-3 px-6 mb-4 rounded text-gray-600 text-lg font-bold shadow">
        View Pinned CIDs
      </h2>
      <div className="mb-8 flex justify-center gap-4">
        <input
          className="h-full w-full border border-gray-200 rounded py-2 px-3"
          type="password"
          placeholder="spheron access token"
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
        />

        <input
          className="h-full w-full border border-gray-200 rounded py-2 px-3"
          type="text"
          placeholder="add bucket id to fetch previous uploads"
          value={bucketId}
          onChange={(e) => setBucketId(e.target.value)}
        />
        <button
          className={`bg-orange-400 py-1 px-10 rounded text-white font-semibold flex gap-2 items-center ${
            bucketId ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={() => handleFetchBucketUploads(bucketId)}
        >
          Fetch
        </button>
      </div>
      {loading && (
        <div className="h-[40vh] flex flex-col items-center justify-center">
          <div
            className="h-10 w-10 mb-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-gray-600"
            role="status"
          />

          <h3 className="text-gray-600 font-semibold text-center">
            Loading...
          </h3>
        </div>
      )}
      {error && (
        <div className="h-[40vh] flex flex-col items-center justify-center">
          <h3 className="text-gray-600 font-semibold text-center">
            Oops! Something went wrong. Please try again later.
          </h3>
        </div>
      )}
      <div>
        {uploadArray.map((uploadItem, i) => (
          <div>
            {uploadItem?.protocolLink ? (
              <a href={uploadItem.protocolLink}>
                <div
                  key={i}
                  className="bg-gray-50 py-1 px-2 my-4 rounded text-gray-600 text-xs font-light shadow cursor-pointer hover:text-blue-600"
                >
                  {i + 1}. {uploadItem.protocolLink} - {uploadItem.status}
                </div>
              </a>
            ) : uploadItem?.status ? (
              <div
                key={i}
                className="bg-gray-50 py-1 px-2 my-4 rounded text-gray-600 text-xs font-light shadow cursor-pointer hover:text-blue-600"
                onClick={() => handleItemClick(uploadItem.uploadId)}
              >
                {i + 1}. {uploadItem.uploadId} - {uploadItem.status}
              </div>
            ) : (
              <div
                key={i}
                className="bg-gray-50 py-1 px-2 my-4 rounded text-gray-600 text-xs font-light shadow cursor-pointer hover:text-blue-600"
                onClick={() => handleItemClick(uploadItem.uploadId)}
              >
                {i + 1}. {uploadItem.uploadId} - Pinning
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default View;
