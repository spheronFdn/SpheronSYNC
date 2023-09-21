import { FC } from "react";

interface IView {
  loading: boolean;
  protocolLinks: string[];
}

const View: FC<IView> = ({ loading, protocolLinks }) => {
  return (
    <div className="bg-white rounded p-6 shadow mt-4">
      <h2 className="bg-blue-100 py-3 px-6 mb-4 rounded text-gray-600 text-lg font-bold shadow">
        View Pinned CIDs
      </h2>
      {loading && (
        <div className="h-[40vh] flex flex-col items-center justify-center">
          <div
            className="h-10 w-10 mb-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-gray-600"
            role="status"
          />

          <h3 className="text-gray-600 font-semibold text-center">
            Pinning CIDs...
          </h3>
        </div>
      )}
      <div>
        {protocolLinks.map((link, i) => (
          <div
            key={i}
            className="bg-gray-50 py-1 px-2 my-4 rounded text-gray-600 text-xs font-light shadow cursor-pointer hover:text-blue-600"
          >
            <a href={link}>
              {i + 1}. {link}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View;
