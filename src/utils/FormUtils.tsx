import { ChangeEvent, Dispatch, DragEvent, SetStateAction } from "react";
import { transformDomain } from "./TransformUtils";

export const handleInputChange = (
  event: ChangeEvent<HTMLInputElement>,
  callback: Dispatch<SetStateAction<{ [key: string]: any }>>
) => {
  const {
    target: { name, value, type, checked, files },
  } = event;

  if (type === "checkbox") {
    callback((prev) => ({
      ...prev,
      [name]: checked,
    }));
  } else if (type === "file") {
    callback((prev) => ({
      ...prev,
      [name]: files?.[0],
    }));
  } else {
    callback((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

export const handleInputBlur = (
  event: ChangeEvent<HTMLInputElement>,
  callback: Dispatch<SetStateAction<{ [key: string]: any }>>
) => {
  const {
    target: { name, value },
  } = event;

  if (
    name.toLowerCase().endsWith("url") ||
    name.toLowerCase().endsWith("link")
  ) {
    callback((prev) => ({
      ...prev,
      [name]: transformDomain(value),
    }));
  } else {
    callback((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

export const handleInputDrop = (
  event: DragEvent<HTMLInputElement>,
  callback: Dispatch<SetStateAction<{ [key: string]: any }>>
) => {
  const { name } = event.currentTarget;
  callback((prev) => ({
    ...prev,
    [name]: event.dataTransfer.files?.[0],
  }));
};
