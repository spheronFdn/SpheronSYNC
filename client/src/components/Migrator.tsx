import { FC, useEffect, useState } from "react";
import Card from "./Card";
import View from "./View";

const Migrator: FC = () => {
  const [protocolLinks, setProtocolLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<string>(
    "https://api.pinata.cloud/data/pinList"
  );
  const [token, setToken] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    const cidLinksArray = localStorage.getItem("cidLinks") || "";
    const parsedLinksArray = cidLinksArray ? JSON.parse(cidLinksArray) : [];
    setProtocolLinks([...parsedLinksArray]);
    setLoading(false);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${endpoint}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      await Promise.all(
        data.rows.map(async (file: any) => {
          await handlePin(file.ipfs_pin_hash);
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePin = async (cid: string) => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_BACKEND_ADDRESS}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cid,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const cidLinksArray = localStorage.getItem("cidLinks") || "";
      const parsedLinksArray = cidLinksArray ? JSON.parse(cidLinksArray) : [];

      setProtocolLinks([...parsedLinksArray, data.pinRes.protocolLink]);

      const stringifiedArray = JSON.stringify([
        ...parsedLinksArray,
        data.pinRes.protocolLink,
      ]);
      localStorage.setItem("cidLinks", stringifiedArray);

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <section className="px-16 py-10">
      <div className="bg-white flex gap-8 justify-center rounded p-6 shadow">
        <Card
          endpoint={endpoint}
          setEndpoint={setEndpoint}
          token={token}
          setToken={setToken}
        />
        <section className="w-1/2">
          <section className="h-full border-4 border-dashed border-gray-200 px-10 py-2 rounded">
            <h2 className="bg-blue-100 py-3 px-6 my-4 rounded text-gray-600 text-lg font-bold shadow">
              Destination Provider
            </h2>
            <div className="shadow py-6 px-12 mb-6">
              <div className="mb-8">
                <label className="text-sm">Spheron Access Token</label>
                <input
                  className="h-full w-full border border-gray-200 rounded py-2 px-4"
                  type="password"
                  placeholder="spheron access token"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                />
              </div>
            </div>
          </section>
        </section>
        <button
          className="absolute top-1/3 mt-2 bg-orange-400 py-2 px-10 rounded text-white font-semibold flex gap-2 items-center"
          onClick={handleSubmit}
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
      <View loading={loading} protocolLinks={protocolLinks} />
    </section>
  );
};

export default Migrator;
