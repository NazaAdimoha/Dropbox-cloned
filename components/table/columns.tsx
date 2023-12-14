"use client";

import { FileType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";;
import Link from "next/link";
import { FileIcon, defaultStyles } from "react-file-icon";
import prettyBytes from "pretty-bytes";
import { COLOR_EXTENSION_MAP } from "@/constants";


const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const typeArray: string = type.split("/")[1];
      return (
        <div className="w-10">
          <FileIcon
            extension={typeArray} 
           labelColor={COLOR_EXTENSION_MAP[typeArray]}
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
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "size",
      header: "Size",
      cell: ({ renderValue, ...props }) => {
        return <span>
          {prettyBytes(renderValue() as number)}
        </span>
      },
    },
    {
      accessorKey: "downloadUrl",
      header: "Link",
      cell: ({ renderValue, ...props }) => (
        <Link 
            href={renderValue() as string}
            target="_blank"
            className="text-blue-500 hover:underline hover:text-blue-700"
        >
          Download
        </Link>
      )
    },
]


export default columns
