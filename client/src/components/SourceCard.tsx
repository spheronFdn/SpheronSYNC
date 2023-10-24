import { FC } from "react";

interface ISourceCard {
  provider: string;
  setProvider: (provider: string) => void;
  token: string;
  setToken: (token: string) => void;
}

const SourceCard: FC<ISourceCard> = ({
  provider,
  setProvider,
  token,
  setToken,
}) => {
  return (
    <section className="w-1/2">
      <section className="h-full border-4 border-dashed border-gray-200 px-10 py-2 rounded mb-6">
        <h2 className="bg-blue-100 py-3 px-6 my-4 rounded text-gray-600 text-lg font-bold shadow">
          Source Provider
        </h2>
        <div className="shadow py-6 px-12 mb-6">
          <div className="mb-4">
            <label className="text-sm">Provider</label>
            <select
              className="h-full w-full outline outline-gray-200 rounded py-2 px-3 border-r-8 border-white"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            >
              <option value="web3storage">Web3Storage</option>
            </select>
          </div>
          <div className="mb-8">
            <label className="text-sm">Token</label>
            <input
              className="h-full w-full border border-gray-200 rounded py-2 px-3"
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

export default SourceCard;
