"use client";

import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

import useRegisterModal from "@/app/hooks/useRegisterModal";

import { AiFillGithub } from "react-icons/ai";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // states
  const [isLoading, setIsLoading] = useState(false);

  // handler to submit form
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // body content
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subTitle="Create an account" />
      <Input
        disabled={isLoading}
        type="email"
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
      />
      <Input
        disabled={isLoading}
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        disabled={isLoading}
        type="password"
        id="password"
        label="Password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  // footer content
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Google"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex justify-center items-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className="font-semibold text-rose-500 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      title="Register"
      actionLabel="Continue"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
