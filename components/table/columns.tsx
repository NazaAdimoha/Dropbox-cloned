"use client";

import { FileType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";;
import Link from "next/link";
import { FileIcon, defaultStyles } from "react-file-icon";
import prettyBytes from "pretty-bytes";
import { COLOR_EXTENSION_MAP } from "@/constants";
import moment from "moment";


const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "fileType",
    header: "type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      //fix for reading property as null error when using split()
      const typeArray = type ? type.split("/") : ["file"];
      const fileType = typeArray[1] || "file";
      return (
        <div className="w-10">
          <FileIcon
            extension={fileType} 
           labelColor={COLOR_EXTENSION_MAP[fileType]}
           // @ts-ignore
           {...defaultStyles[typeArray]}
          />
        </div>
      )
    }
  },
    {
      accessorKey: "fileName",
      header: "Filename",
    },
    {
      accessorKey: "timestamp",
      header: "Date Added",
      //date formatting appears as an array of objects need to format to string using moment
      // cell: ({ renderValue, ...props }) => {
      //   const date = renderValue() as Date;
      //   return <span>
      //     {
      //       date ? moment(date).format(
      //         "MMMM Do YYYY, h:mm:ss a, z"
      //       )
      //       : "N/A"
      //     }
      //   </span>;
      // },
    },
    {
      accessorKey: "fileSize",
      header: "Size",
      cell: ({ renderValue, ...props }) => {
        // Ensure renderValue() returns a valid finite number
        const value = renderValue() as number;

        // Check if value is a valid finite number before applying prettyBytes
        const formattedValue = Number.isFinite(value) ? prettyBytes(value) : "N/A";

        return <span>{formattedValue}</span>;
      },
    },
    {
      accessorKey: "fileUrl",
      header: "Link",
      cell: ({ renderValue, ...props }) => (
        <a 
            href={renderValue() as string}
            target="_blank"
            className="text-blue-500 underline hover:text-blue-700"
        >
          Download
        </a>
      )
    },
]


export default columns
