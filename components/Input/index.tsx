import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Multiselect } from "multiselect-react-dropdown";
import { overrideTailwindClasses } from "tailwind-override";

interface IOption {
  value: string;
  label: string;
}

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;

  type?: "text" | "password" | "radio" | "textarea" | "multiselect" | "file";
  label?: string;
  placeholder?: string;
  error?: string;
  options?: IOption[];
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onSelect?: (selectedOptions: IOption[]) => void;
  className?: string;
}
type TInputElement = {
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  value: string;
};
const Input = <T extends FieldValues>(props: InputProps<T>) => {
  const {
    name,
    control,
    type = "text",
    label,
    placeholder,
    error,
    options,
    rules,
    onChange,
    onSelect,
    className,
  } = props;

  const renderInputElement = (inputProps: TInputElement) => {
    switch (type) {
      case "radio":
        return (
          <div className="flex items-center">
            {options?.map((option, index) => (
              <div className="ml-4" key={option.value}>
                <input
                  className={className && overrideTailwindClasses(className)}
                  type="radio"
                  id={`${name}-${option.value}`}
                  {...inputProps}
                  value={option.value}
                  onChange={(e) => {
                    onChange && onChange(e);
                    inputProps.onChange(e);
                  }}
                  checked={option.value === inputProps.value || index === 0}
                />
                <label
                  htmlFor={`${name}-${option.value}`}
                  className="ml-2 text-whiteCt"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      case "textarea":
        return (
          <textarea
            id={name}
            {...inputProps}
            placeholder={placeholder}
            className="w-full bg-blackBgCt p-[10px] text-whiteCt"
          />
        );
      case "multiselect":
        return (
          <Multiselect
            options={options}
            displayValue="label"
            showCheckbox={true}
            hidePlaceholder={true}
            closeOnSelect={false}
            onSelect={onSelect}
            onRemove={onSelect}
            avoidHighlightFirstOption={true}
            closeIcon="cancel"
          />
        );
      case "file":
        return (
          <input
            onChange={(e) => {
              onChange && onChange(e);
              inputProps.onChange(e);
            }}
            type="file"
            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          />
        );
      default:
        return (
          <input
            id={name}
            {...inputProps}
            onChange={(e) => {
              onChange && onChange(e);
              inputProps.onChange(e);
            }}
            type={type}
            placeholder={placeholder}
            className={overrideTailwindClasses(
              `w-full rounded-lg border-[1.5px]  border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-green active:border-green disabled:cursor-default  ${className}`
            )}
          />
        );
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className="block w-full relative my-4">
          {label && (
            <div className="mb-2 flex justify-between text-xs font-bold">
              <label htmlFor={name}>{label}</label>
            </div>
          )}
          {renderInputElement(field)}
          {error && (
            <div className="absolute -bottom-6   text-[15px] text-redCt">
              {error}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default Input;
