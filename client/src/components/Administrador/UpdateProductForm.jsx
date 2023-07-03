import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TextField, FormControl, Select, MenuItem, Button } from '@mui/material';

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3, 'The minimum is 3'),
  brand: Yup.string().min(3, 'The minimum is 3'),
  imgurl: Yup.string().url('Please enter a valid URL'),
  description: Yup.string().min(10, 'The minimum is 10'),
  category: Yup.string(),
  price: Yup.number().positive('Price must be a positive number'),
});

const UpdateProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [product, setProduct] = useState({});

  const formik = useFormik({
    initialValues: {
      title: '',
      brand: '',
      imgurl: '',
      description: '',
      category: '',
      price: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await Swal.fire({
          title: '¿Estás seguro?',
          text: '¡No podrás revertir esto!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, actualizarlo',
          cancelButtonText: 'Cancelar'
        });
        if (result.isConfirmed) {
          const res = await axios.put(`http://localhost:8000/api/item/${id}/`, values);
          await Swal.fire({
            title: '¡Producto actualizado exitosamente!',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
          });
          console.log(res);
          navigate("/admin");
        }
      } catch (err) {
        console.error(err.message);
        await Swal.fire({
          title: '¡Error!',
          text: 'No se pudo actualizar el producto. Por favor, inténtalo de nuevo más tarde.',
          icon: 'error'
        });
      }
      setSubmitting(false);
    },
  }); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/item/" + id);
        // setProduct(response.data);
        formik.setValues(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className='col-md-6'>
      <form onSubmit={formik.handleSubmit}>

        <div>
          <FormControl fullWidth margin="normal" variant="outlined">
            <label htmlFor="title">Título:</label>
            <TextField
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth margin="normal" variant="outlined">
            <label htmlFor="brand">Marca:</label>
            <TextField
              id="brand"
              name="brand"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.brand}
            />
            {formik.touched.brand && formik.errors.brand ? (
              <div>{formik.errors.brand}</div>
            ) : null}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth margin="normal" variant="outlined">
            <label htmlFor="imgurl">URL de la imagen:</label>
            <TextField
              id="imgurl"
              name="imgurl"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.imgurl}
            />
            {formik.touched.imgurl && formik.errors.imgurl ? (
              <div>{formik.errors.imgurl}</div>
            ) : null}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth margin="normal" variant="outlined">
            <label htmlFor="description">Descripción:</label>
            <TextField
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth margin="normal" variant="outlined">
            <label htmlFor="category">Categoría:</label>
            <Select
              id="category"
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            >
              <MenuItem value="Fotografías y Filmación">Fotografías y Filmación</MenuItem>
              <MenuItem value="Informática">Informática</MenuItem>
              <MenuItem value="Electrodomésticos">Electrodomésticos</MenuItem>
              <MenuItem value="Indumentarias">Indumentarias</MenuItem>
            </Select>
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth margin="normal" variant="outlined">
            <label htmlFor="price">Precio:</label>
            <input
              id="price"
              name="price"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null}
          </FormControl>
        </div>

        <div>
          <Button type="submit" disabled={formik.isSubmitting} variant="contained" color="primary">
            Actualizar
          </Button>
        </div>

      </form>
    </div>
  );
};
export default UpdateProductForm