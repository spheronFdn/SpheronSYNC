import { FC } from "react";

interface ICard {
  endpoint: string;
  setEndpoint: (endpoint: string) => void;
  token: string;
  setToken: (token: string) => void;
}

const Card: FC<ICard> = ({ endpoint, setEndpoint, token, setToken }) => {
  return (
    <section className="w-1/2">
      <section className="h-full border-4 border-dashed border-gray-200 px-10 py-2 rounded mb-6">
        <h2 className="bg-blue-100 py-3 px-6 my-4 rounded text-gray-600 text-lg font-bold shadow">
          Source Provider
        </h2>
        <div className="shadow py-6 px-12 mb-6">
          <div className="mb-4">
            <label className="text-sm">Endpoint</label>
            <input
              className="h-full w-full border border-gray-200 rounded py-2 px-4"
              placeholder="endpoint"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="text-sm">Token</label>
            <input
              className="h-full w-full border border-gray-200 rounded py-2 px-4"
              type="password"
              placeholder="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Card;
