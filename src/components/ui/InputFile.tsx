"use client";

import React, { useState } from "react";
import { FilePond, registerPlugin, FilePondProps } from "react-filepond";
import type { FilePondInitialFile } from "filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import { delFile, fileUpload, getFile } from "@backend/lib";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

export const IMAGE_TYPES = ["image/*"];

interface Props extends FilePondProps {
  name: string;
  id?: string;
  label?: string;
  required?: boolean;
  fileType?: string[];
  getFileUrl?: (url: string) => void;
  maxFileSize?: number;
  path?: string;
  initialImages?: (string | FilePondInitialFile | Blob)[];
  callback?: () => void;
  value: any;
  setFieldValue: (field: string, value: any) => void;
}

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const InputFile: React.FC<Props> = ({
  name,
  id = name,
  label,
  required = false,
  getFileUrl,
  fileType = IMAGE_TYPES,
  maxFileSize = 1000000,
  path = "",
  beforeRemoveFile,
  initialImages,
  callback,
  setFieldValue,
  value,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<(string | FilePondInitialFile | Blob)[]>(
    []
  );

  return (
    <div className="w-full space-y-2">
      {label && (
        <label htmlFor={name} className="font-semibold">
          {label}
        </label>
      )}

      <FilePond
        id={id}
        name={name}
        oninit={() => setFieldValue(name, [])}
        files={files}
        // @ts-expect-error
        onupdatefiles={setFiles}
        acceptedFileTypes={fileType}
        server={{
          process: async (fieldName, file, metadata, load) => {
            setIsLoading(true);

            if (file) {
              setFiles([...files!, file]);

              try {
                const filePath = `${path}/${file.name}`;

                await fileUpload(filePath, file);
                const fileUrl = await getFile(filePath);

                console.log({ fileUrl });

                let fileUrls = value as string[];
                fileUrls.push(fileUrl);

                // getFileUrl?.(fileUrls);
                callback?.();

                setFieldValue(name, fileUrls);
                load(fileUrl);
              } catch (error) {
                console.log(error);
              }
            }

            setIsLoading(false);
          },
        }}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        disabled={isLoading}
        {...rest}
        onremovefile={async (e, file) => {
          const filePath = `${path}/${file.filename}`;
          try {
            const fileUrl = await getFile(filePath);

            let fileUrls = value as string[];
            fileUrls = fileUrls.filter((e) => e !== fileUrl);

            setFieldValue(name, fileUrls);

            delFile(filePath);
            callback?.();
          } catch (error) {}
        }}
      />
    </div>
  );
};

export default InputFile;
