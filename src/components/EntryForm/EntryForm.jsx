import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function EntryForm({
  onSubmit,
  initialValues,
  categories,
  isEditing,
}) {
  const validationSchema = Yup.object({
    date: Yup.string().required("Оберіть дату"),
    category: Yup.string().required("Оберіть категорію"),
    type: Yup.string().oneOf(["income", "expense"]).required("Оберіть тип"),
    amount: Yup.number().required("Введіть суму").positive("Має бути > 0"),
    description: Yup.string().max(100, "Не більше 100 символів"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ setFieldValue, values }) => (
        <Form className="flex flex-col gap-3">
          {/* Дата */}
          <Field
            type="date"
            name="date"
            className="border p-2 rounded-md w-full"
          />
          <ErrorMessage
            name="date"
            component="div"
            className="text-red-500 text-sm"
          />

          {/* Категорія */}
          <Field
            as="select"
            name="category"
            className="border p-2 rounded-md w-full"
          >
            <option value="">Оберіть категорію</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="category"
            component="div"
            className="text-red-500 text-sm"
          />

          {/* Тип (дохід / витрати) */}
          <div className="flex w-full">
            <button
              type="button"
              className={`p-2 w-1/2 rounded-l border ${
                values.type === "expense"
                  ? "bg-gray-700  text-zinc-300 border-0"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setFieldValue("type", "expense")}
            >
              Витрати
            </button>
            <button
              type="button"
              className={`p-2 w-1/2 rounded-r border ${
                values.type === "income"
                  ? "bg-gray-700 text-zinc-300 border-0"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setFieldValue("type", "income")}
            >
              Дохід
            </button>
          </div>
          <ErrorMessage
            name="type"
            component="div"
            className="text-red-500 text-sm"
          />

          {/* Сума */}
          <Field
            name="amount"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="border p-2 rounded-md appearance-none w-full"
            placeholder="Сума"
          />
          <ErrorMessage
            name="amount"
            component="div"
            className="text-red-500 text-sm"
          />

          {/* Опис — нове поле */}
          <Field
            name="description"
            as="textarea"
            placeholder="Опис (необов’язково)"
            className="border p-2 rounded-md w-full"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500 text-sm"
          />

          {/* Кнопка */}
          <button
            type="submit"
            // className={`w-full ${
            //   isEditing ? "bg-gray-500" : "bg-gray-700"
            // } text-zinc-300 p-4 rounded-xs ` }
            className={`w-full ${
              isEditing ? "bg-gray-500" : "bg-gray-700"
            } text-zinc-300 p-4 rounded-xs `}
          >
            {isEditing ? "Оновити" : "Додати"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
