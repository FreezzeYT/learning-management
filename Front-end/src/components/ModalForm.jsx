import React from "react";
import { useForm } from "react-hook-form";

const ModalForm = ({ isOpen, onClose, onSubmit, title, fields }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const closeAndReset = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
    closeAndReset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative">
        <button
          onClick={closeAndReset}
          className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                {...register(field.name, { required: field.required })}
                type={field.type || "text"}
                placeholder={field.placeholder}
                defaultValue={field.defaultValue || ""}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {field.label} is required
                </p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
