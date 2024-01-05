"use client";

import React, { useState } from "react";
import { FilePond, registerPlugin, FilePondProps } from "react-filepond";
import type { FilePondInitialFile } from "filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import { delFile, fileUpload, getFile } from "@backend/lib";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { unescape } from "querystring";

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
  initialImages,
  callback,
  setFieldValue,
  value,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<(string | FilePondInitialFile | Blob)[]>(
    initialImages || []
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
          load: (source, load, error, progress, abort, headers) => {
            var myRequest = new Request(source);
            fetch(myRequest).then(function (response) {
              response.blob().then(function (myBlob) {
                load(myBlob);
              });
            });
          },
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
          const filePath = decodeURIComponent(file.filename).includes(
            "products/"
          )
            ? decodeURIComponent(file.filename)
            : `${path}/${file.filename}`;

          console.log(filePath, decodeURIComponent(file.filename));
          try {
            const fileUrl = await getFile(filePath);
            console.log({ fileUrl });

            let fileUrls = value as string[];
            fileUrls = fileUrls.filter((e) => e !== fileUrl);

            setFieldValue(name, fileUrls);

            delFile(filePath);
            callback?.();
          } catch (error) {
            console.log({ error });
          }
        }}
      />
    </div>
  );
};

export default InputFile;
