import { FC } from "react";

interface IDestinationCard {
  bucketName: string;
  setBucketName: (bucketName: string) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const DestinationCard: FC<IDestinationCard> = ({
  bucketName,
  setBucketName,
  accessToken,
  setAccessToken,
}) => {
  return (
    <section className="w-1/2">
      <section className="h-full border-4 border-dashed border-gray-200 px-10 py-2 rounded">
        <h2 className="bg-blue-100 py-3 px-6 my-4 rounded text-gray-600 text-lg font-bold shadow">
          Destination Provider
        </h2>
        <div className="shadow py-6 px-12 mb-6">
          <div className="mb-4">
            <label className="text-sm">Bucket Name</label>
            <input
              className="h-full w-full border border-gray-200 rounded py-2 px-3"
              type="text"
              placeholder="bucket name"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="text-sm">Spheron Access Token</label>
            <input
              className="h-full w-full border border-gray-200 rounded py-2 px-3"
              type="password"
              placeholder="spheron access token"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default DestinationCard;
