"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { FileType } from "@/typings";
import moment from "moment";
import { useFileStore } from "@/store/store";
import { DeleteModal } from "../ui/DeleteModal";
import { EditModal } from "../ui/EditModal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  //initialize global state from useFileStore
  const [setIsDeleteModalOpen, setFileId, setIsEditModalOpen, setFileName] =
    useFileStore((state) => [
      state.setIsDeleteModalOpen,
      state.setFileId,
      state.setIsEditModalOpen,
      state.setFilename,
    ]);

  //set up open delete modal function
  const openDeleteModal = (fileId: string) => {
    setFileId(fileId);
    setIsDeleteModalOpen(true);
  };

  //set up open edit modal function
  const openEditModal = (fileId: string, filename: string) => {
    setFileId(fileId);
    setFileName(filename);
    setIsEditModalOpen(true);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                <DeleteModal />
                <EditModal />
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === "timestamp" ? (
                      <div className="flex flex-col ">
                        <div className="text-sm">
                          {moment(cell.getValue() as Date).format("LL")}
                        </div>

                        <div className="text-xs text-gray-500">
                          {moment(cell.getValue() as Date).format("LT")}
                        </div>
                      </div>
                    ) : cell.column.id === "fileName" ? (
                      <p
                        className="flex items-center text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                        onClick={
                          () =>
                            openEditModal(
                              (row.original as FileType).id,
                              (row.original as FileType).fileName
                            )
                          // console.log("Omoo")
                        }
                      >
                        {cell.getValue() as string}{" "}
                        <PencilIcon size={15} className="ml-2" />
                      </p>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}

                <TableCell key={(row.original as FileType).id}>
                  <Button
                    variant={"outline"}
                    className="ml-auto w-26 h-10"
                    onClick={() => {
                      openDeleteModal((row.original as FileType).id);
                      // console.log("Gadamn");

                      // @ts-ignore
                      // row.original.deleteFile(row.original.id)
                    }}
                  >
                    <TrashIcon size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Ooups! You've got no files.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
