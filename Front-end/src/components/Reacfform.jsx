import React from "react";
import { useForm } from "react-hook-form";

const Reactform = () => {
  // Destructure necessary hooks from useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form submission handler
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <h1>Simple Form with React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            {...register("firstName", { required: "First Name is required" })}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            {...register("lastName", { required: "Last Name is required" })}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Reactform;
