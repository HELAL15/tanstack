import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { object, string } from 'yup';

interface IProps {
  title: string;
  name: string;
  age: string;
}

const TableCrud = () => {
  const validationSchema = object({
    title: string().required('Title is required'),
    name: string().required('Name is required'),
    age: string().required('Age is required')
  });

  const columns = [
    {
      header: 'Title',
      accessorKey: 'title'
    },
    {
      header: 'Name',
      accessorKey: 'name'
    },
    {
      header: 'Age',
      accessorKey: 'age'
    }
  ];

  const [data, setData] = useState<IProps[]>([]);

  const storedData = localStorage.getItem('DATA_TABLE');
  useEffect(() => {
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, [storedData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });
  useEffect(() => {
    table.setOptions((prev) => ({
      ...prev,
      data
    }));
  }, [data]);
  const submitForm = (values: IProps) => {
    setData((prevData) => {
      const updatedData = [...prevData, values];
      localStorage.setItem('DATA_TABLE', JSON.stringify(updatedData));
      setData(updatedData);
      return updatedData;
    });
  };

  const initialValues: IProps = {
    title: '',
    name: '',
    age: ''
  };

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          submitForm(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Field name="title" placeholder="Title" />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="error"
                    />
                  </td>
                  <td>
                    <Field name="name" placeholder="Name" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    />
                  </td>
                  <td>
                    <Field name="age" placeholder="Age" type="text" />
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="error"
                    />
                  </td>
                  <td>
                    <button type="submit" disabled={!isValid || isSubmitting}>
                      +
                    </button>
                  </td>
                </tr>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default TableCrud;
