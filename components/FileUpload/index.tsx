import React from "react";
import { Controller } from "react-hook-form";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";

type TPhoto = {
  name: string;
  control: any;
  label: string;
  onChange?: (fileUrl: string) => void;
  error?: string;
  rules?: any;
};

const FileUpload = React.forwardRef<HTMLInputElement, TPhoto>((props, ref) => {
  const { name, control, onChange, label, error, rules } = props;

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onChangeFun: (value: string) => void
  ) => {
    if (event?.target.files) {
      const file = event.target.files[0];
      const imageUrls = await uploadToCloudinary([file]);
      if (imageUrls && imageUrls[0]) {
        onChangeFun(imageUrls[0].url);
        onChange && onChange(imageUrls[0].url);
      }
    }
  };

  return (
    <div className="relative ">
      <Controller
        rules={rules}
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <div className="block w-full relative my-8">
            {label && (
              <div className="mb-2  flex justify-between text-xs font-bold">
                <label htmlFor={name}>{label}</label>
              </div>
            )}
            <input
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              id={name}
              ref={ref}
              onChange={(event) => handleChange(event, onChange)}
              type={"file"}
              multiple
              accept="image/jpeg, image/png, video/mp4"
            />
            {error && (
              <div className="absolute -bottom-6   text-[15px] text-redCt">
                {error}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
});

export default FileUpload;
