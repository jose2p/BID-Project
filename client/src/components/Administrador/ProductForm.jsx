import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import swal from 'sweetalert2';
import {TextField, FormControl,Select,MenuItem, Button} from '@mui/material';

const initialValues = {
  title: '',
  brand: '',
  imgurl: '',
  description: '',
  category: '',
  price: '',
};

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Por favor ingrese un título';
  } else if (values.title.length < 3) {
    errors.title = 'El título debe tener al menos 3 caracteres';
  }
  if (!values.brand) {
    errors.brand = 'Por favor ingrese la marca';
  } else if (values.brand.length < 3) {
    errors.brand = 'La marca debe tener al menos 3 caracteres';
  }
  if (!values.description) {
    errors.description = 'Por favor ingrese una descripción';
  } else if (values.description.length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres';
  }
  return errors;
};

const onSubmit = (values, { setSubmitting, resetForm }) => {
  axios.post('http://localhost:8000/api/item', values)
    .then(response => {
      resetForm();
      swal.fire({
        icon: 'success',
        title: '¡Producto agregado!',
        text: 'El producto se ha agregado correctamente.',
      });
    })
    .catch(error => {
      swal.fire({
        icon: 'error',
        title: 'Error al agregar el producto',
        text: 'Ha ocurrido un error al agregar el producto. Por favor, inténtelo de nuevo más tarde.',
      });
    })
    .finally(() => {
      setSubmitting(false);
    });
};

const ProductForm = () => (
  <Formik
    initialValues={initialValues}
    validate={validate}
    onSubmit={onSubmit}
  >
    {({ isSubmitting }) => (
      <Form>
      <h5>Agregar productos</h5>
      <FormControl fullWidth margin="normal" variant="outlined">
        <label htmlFor="title">Título</label>
        <Field
          as={TextField}
          type="text"
          name="title"
          variant="outlined"
          size="small"
          autoComplete="off"
        />
        <ErrorMessage name="title" component="div" />
      </FormControl>
      <FormControl fullWidth margin="normal" variant="outlined">
        <label htmlFor="brand">Marca</label>
        <Field
          as={TextField}
          type="text"
          name="brand"
          variant="outlined"
          size="small"
          autoComplete="off"
        />
        <ErrorMessage name="brand" component="div" />
      </FormControl>
      <FormControl fullWidth margin="normal" variant="outlined">
        <label htmlFor="imgurl">URL de imagen</label>
        <Field
          as={TextField}
          type="text"
          name="imgurl"
          variant="outlined"
          size="small"
          autoComplete="off"
        />
      </FormControl>
      <FormControl fullWidth margin="normal" variant="outlined">
        <label htmlFor="description">Descripción</label>
        <Field
          as={TextField}
          type="text"
          name="description"
          variant="outlined"
          size="small"
          autoComplete="off"
        />
        <ErrorMessage name="description" component="div" />
      </FormControl>
      <FormControl fullWidth margin="normal" variant="outlined">
        <label htmlFor="category">Categoría</label>
        <Field as={Select} name="category" variant="outlined" size="small">
          <MenuItem value="Fotografías y Filmación">Fotografías y Filmación</MenuItem>
          <MenuItem value="Informática">Informática</MenuItem>
          <MenuItem value="Electrodomésticos">Electrodomésticos</MenuItem>
          <MenuItem value="Indumentarias">Indumentarias</MenuItem>
        </Field>
      </FormControl>
      <FormControl fullWidth margin="normal" variant="outlined">
        <label htmlFor="price">Precio</label>
        <Field
          as={TextField}
          type="number"
          name="price"
          variant="outlined"
          size="small"
          autoComplete="off"
        />
      </FormControl>
      <Button type="submit" disabled={isSubmitting} variant="contained" color="primary">
        Enviar
      </Button>
    </Form>
    )}
  </Formik>
);

export default ProductForm;
