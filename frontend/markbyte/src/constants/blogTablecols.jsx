import { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export const blogTablecols = [
  {
    accessorKey: "title",
    header: "Blog Name",
  },
  {
    accessorKey: "date",
    header: "Date Published",
    cell: ({ getValue }) => {
      const date = new Date(getValue());
      return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
    },
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ getValue }) => (
      <a
        href={getValue()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        View Blog <FaExternalLinkAlt className="ml-2" />
      </a>
    ),
  },
  {
    accessorKey: "version",
    header: "Version",
    cell: ({ row }) => {
      const [selectedVersion, setSelectedVersion] = useState(
        row.original.latestVersion
      );

      useEffect(() => {
        setSelectedVersion(row.original.latestVersion);
      }, [row.original.latestVersion]);

      return (
        <select
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
          className="w-full px-2 py-1 border rounded-lg"
        >
          {Array.isArray(row.original.version) ? (
            row.original.version.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))
          ) : (
            <option value={row.original.version}>{row.original.version}</option>
          )}
        </select>
      );
    },
  },
  {
    accessorKey: "publishStatus",
    header: "Publish? (Needs to Be Configured)",
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <button
          className="w-[200px] px-2 py-1 border rounded-lg bg-[#084464] text-white hover:bg-[#0a5a7c] transition-all duration-300 ease-in-out"
          onClick={() => {
            console.log("Publishing version", selectedVersion);
          }}
        >
          Publish
        </button>
      </div>
    ),
  },
];