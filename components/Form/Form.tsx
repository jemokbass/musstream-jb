import { Field, Form as FormComponent, Formik, FormikHelpers } from "formik";
import { HTMLInputTypeAttribute } from "react";
import { ObjectSchema, AnyObject } from "yup";
import { toast } from "react-hot-toast";

import { Button } from "../Button";

type ValueField = {
  value: any;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  accept?: string;
};

type Props<T> = {
  values: T;
  schema: ObjectSchema<ValueField["value"], AnyObject, { [Property in keyof T]: undefined }, "">;
  errorMessage?: string;
  onSubmitForm: (
    values: Record<string, any>,
    actions?: FormikHelpers<Record<keyof T, any>>
  ) => Promise<void | string>;
};

export const Form = <Values extends Record<string, ValueField>>({
  values,
  schema,
  onSubmitForm,
  errorMessage = "Something went wrong :(",
}: Props<Values>) => {
  const initialValues = Object.entries(values).reduce((acc, item) => {
    acc = { ...acc, [item[0]]: item[1].value };
    return acc;
  }, {}) as Record<keyof Values, any>;
  const className =
    "flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none";

  const onSubmitHandler = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    try {
      await onSubmitForm(values, actions);
    } catch (error) {
      toast.error(errorMessage);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmitHandler}>
      {({ errors, touched, isSubmitting, setFieldValue, handleBlur }) => (
        <FormComponent className="flex flex-col gap-y-4">
          {Object.entries(values).map(([key, value]) => {
            if (value.type === "file") {
              return (
                <fieldset key={key} className="pb-1">
                  <div>{value.placeholder}</div>
                  <input
                    name={key}
                    id={key}
                    type={value.type}
                    disabled={isSubmitting}
                    accept={value.accept}
                    className={className}
                    onBlur={handleBlur}
                    onChange={e => setFieldValue(key, e.currentTarget.files?.[0])}
                  />
                  {errors[key] && touched[key] && (
                    <div className="text-red-500 text-sm mt-1">{String(errors[key])}</div>
                  )}
                </fieldset>
              );
            }

            return (
              <fieldset key={key}>
                <Field
                  className={className}
                  id={key}
                  name={key}
                  placeholder={value?.placeholder ?? ""}
                  type={value?.type ?? "text"}
                  disabled={isSubmitting}
                />
                {errors[key] && touched[key] && (
                  <div className="text-red-500 text-sm mt-1">{String(errors[key])}</div>
                )}
              </fieldset>
            );
          })}
          <Button type="submit" disabled={isSubmitting}>
            Create
          </Button>
        </FormComponent>
      )}
    </Formik>
  );
};
