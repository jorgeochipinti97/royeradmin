import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  DriveFileRenameOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { AddOutlined } from "@mui/icons-material";

import { AdminLayout } from "../../../components/layouts";
import { IProduct, ITallas } from "../../../interfaces";
import { dbProducts } from "../../../database";
import { tesloApi } from "../../../api";
import { Product } from "../../../models";
import { useUser } from "@auth0/nextjs-auth0/client";

const validTypes = [
  "shirts",
  "t-shirt",
  "football shirt",
  "jacket",
  "pants",
  "mate",
  "yerba",
  "alfajores",
  "wine",
  "short",
  "socks",
  "wallet",
  "purse",
  "accessories",
  "bag",
  "espadrilles",
  "footwear",
];
const validGender = ["football", "regionals",];
const validSizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
  "Unique",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
  "12.5",
  "13",
  "14",
  "15",
];

interface FormData {
  _id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
  gender: string;
  popular: boolean;
  productosRelacionados?: [{
    title: string,
    price: number,
    description: string,
    image: string
  }]
}

interface Props {
  product: FormData;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const { asPath, push } = useRouter();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newTagValue, setNewTagValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isHidden, setIsHidden] = useState<boolean>();
  const [tallas_, setTallas_] = useState<ITallas[]>([]);
  const { error, isLoading, user } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: product
  });

  useEffect(() => {
    try {
      const subscription = watch((value, { name, type }) => {
        if (name === "title") {
          const newSlug =
            value.title
              ?.trim()
              .replaceAll(" ", "_")
              .replaceAll("'", "")
              .toLocaleLowerCase() || "";

          setValue("slug", newSlug);
        }
      });
      return () => subscription.unsubscribe();
    } catch (err) {
      alert(err);
    }
  }, [watch, setValue]);







  const onChangeSize = (size: string) => {
    try {
      const currentSizes = getValues("sizes");
      if (currentSizes.includes(size)) {
        return setValue(
          "sizes",
          currentSizes.filter((s) => s !== size),
          { shouldValidate: true }
        );
      }

      setValue("sizes", [...currentSizes, size], { shouldValidate: true });
      console.log(currentSizes)
    } catch (err) {

      alert(err)
    }
  };

  const onChangeTalla = (size: string, number: number) => {
    try {
      const setTallas = tallas_.filter((e) => e.size != size);
      setTallas_(setTallas.concat({ size: size, stock: number || 0 }));
    } catch (err) {
      console.log(err);
    }
  };
  const onDeleteTallas = (size: string) => {
    try {
      const newTallas = tallas_.filter((e) => e.size != size);
      setTallas_(newTallas);
      console.log(tallas_);
    } catch (err) {
      console.log(err);
    }
  };

  const onNewTag = () => {
    try {
      const newTag = newTagValue.trim().toLocaleLowerCase();
      setNewTagValue("");
      const currentTags = getValues("tags");

      if (currentTags.includes(newTag)) {
        return;
      }

      currentTags.push(newTag);
    } catch (err) {
      alert(err);
    }
  };

  const onDeleteTag = (tag: string) => {
    try {
      const updatedTags = getValues("tags").filter((t) => t !== tag);
      setValue("tags", updatedTags, { shouldValidate: true });
    } catch (err) {
      alert(err);
    }
  };

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await tesloApi.post<{ message: string }>(
          "/admin/upload",
          formData
        );
        setValue("images", [...getValues("images"), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onDeleteImage = (image: string) => {
    setValue(
      "images",
      getValues("images").filter((img) => img !== image),
      { shouldValidate: true }
    );
  };

  const onChangePopular = async (e: string) => {
    if (e == "true") {
      setValue("popular", true);
      console.log(getValues("popular"));
    } else {
      setValue("popular", false);
      console.log(getValues("popular"));
    }
  };


  const onSubmit = async (form: FormData) => {
    if (form.images.length < 2) return alert("Mínimo 2 imagenes");
    setIsSaving(true);
    console.log(form)
    try {
      const { data } = await tesloApi({
        url: "/admin/products",
        method: form._id ? "PUT" : "POST", // si tenemos un _id, entonces actualizar, si no crear
        data: form,
      });

      console.log({ data });
      if (!form._id) {
        router.replace(`/admin/products/${form.slug}`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  const onSubmitDelete = async (form: FormData) => {
    try {
      const { data } = await tesloApi({
        url: "/admin/products",
        method: "DELETE",
        data: form,
      });
      router.replace(`/admin/products/`);
    } catch (error) {
      console.log(error);
    }
  };
  return (


    <AdminLayout
      title={"Producto"}
      subTitle={`Editando: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      {user?.email?.toLowerCase() == 'jorgeochipinti97@gmail.com' ? (
        <>
          {asPath == "/admin/products/new" ? null : (
            <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
              <Button
                startIcon={<AddOutlined />}
                color="secondary"
                href="/admin/products/new"
              >
                Crear Nuevo Producto
              </Button>
            </Box>
          )}

          <Box display="flex" justifyContent="center" flexDirection="column">
            <Button
              color="error"
              startIcon={<DeleteForeverIcon />}
              sx={{ width: "150px", mb: 2 }}
              onClick={handleSubmit(onSubmitDelete)}
            >
              Borrar Producto
            </Button>
            <TextField
              label="introduzca el nombre para eliminar correctamente"
              variant="filled"
              sx={{ mb: 3, width: "300px" }}
              {...register("title", {
                required: "Este campo es requerido",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Box>

          <Divider sx={{ my: 1 }} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
              <Button
                color="secondary"
                startIcon={<SaveOutlined />}
                sx={{ width: "150px" }}
                type="submit"
                disabled={isSaving}
              >
                Guardar
              </Button>
            </Box>

            <Grid container spacing={2}>
              {/* Data */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Título"
                  variant="filled"
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register("title", {
                    required: "Este campo es requerido",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                  })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />

                <TextField
                  label="Descripción"
                  variant="filled"
                  fullWidth
                  multiline
                  sx={{ mb: 1 }}
                  {...register("description", {
                    required: "Este campo es requerido",
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />

                <TextField
                  label="Inventario"
                  type="number"
                  variant="filled"
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register("inStock", {
                    required: "Este campo es requerido",
                    min: { value: 0, message: "Mínimo de valor cero" },
                  })}
                  error={!!errors.inStock}
                  helperText={errors.inStock?.message}
                />

                <TextField
                  label="Precio"
                  type="number"
                  variant="filled"
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register("price", {
                    required: "Este campo es requerido",
                    min: { value: 0, message: "Mínimo de valor cero" },
                  })}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />

                <Box display="flex" flexDirection="column">
                  <FormControl sx={{ mb: 1 }}>
                    <FormLabel>Tipo</FormLabel>
                    <RadioGroup
                      row
                      value={getValues("type")}
                      onChange={({ target }) =>
                        setValue("type", target.value, { shouldValidate: true })
                      }
                    >
                      {validTypes.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio color="secondary" />}
                          label={capitalize(option)}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>

                  <FormControl sx={{ mb: 1 }}>
                    <FormLabel>Género</FormLabel>
                    <RadioGroup
                      row
                      value={getValues("gender")}
                      onChange={({ target }) =>
                        setValue("gender", target.value, { shouldValidate: true })
                      }
                    >
                      {validGender.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio color="secondary" />}
                          label={capitalize(option)}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>

                  <FormControl sx={{ mb: 1 }}>
                    <FormLabel>Es Popular?</FormLabel>
                    <RadioGroup
                      row
                      onChange={({ target }) => onChangePopular(target.value)}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio color="secondary" />}
                        label={"true"}
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio color="secondary" />}
                        label={"false"}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Grid>
              {/* Tags e imagenes */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Slug - URL"
                  variant="filled"
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register("slug", {
                    required: "Este campo es requerido",
                    validate: (val) =>
                      val.trim().includes(" ")
                        ? "No puede tener espacios en blanco"
                        : undefined,
                  })}
                  error={!!errors.slug}
                  helperText={errors.slug?.message}
                />

                <TextField
                  label="Etiquetas"
                  variant="filled"
                  fullWidth
                  sx={{ mb: 1 }}
                  helperText="Presiona [spacebar] para agregar"
                  value={newTagValue}
                  onChange={({ target }) => setNewTagValue(target.value)}
                  onKeyUp={({ code }) =>
                    code === "Space" ? onNewTag() : undefined
                  }
                />

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    listStyle: "none",
                    p: 0,
                    m: 0,
                  }}
                  component="ul"
                >
                  {getValues("tags") && getValues("tags").map((tag) => {
                    return (
                      <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => onDeleteTag(tag)}
                        color="primary"
                        size="small"
                        sx={{ ml: 1, mt: 1 }}
                      />
                    );
                  })}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" flexDirection="column">
                  <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                  <Button
                    color="secondary"
                    fullWidth
                    startIcon={<UploadOutlined />}
                    sx={{ mb: 3 }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Cargar imagen
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/png, image/gif, image/jpeg"
                    style={{ display: "none" }}
                    onChange={onFilesSelected}
                  />

                  <Chip
                    label="Es necesario al 2 imagenes"
                    color="error"
                    variant="outlined"
                    sx={{
                      display: getValues("images") && getValues("images").length < 2 ? "flex" : "none",
                    }}
                  />

                  <Grid container spacing={2}>
                    {getValues("images") && getValues("images").map((img) => (
                      <Grid item xs={4} sm={3} key={img}>
                        <Card>
                          <CardMedia
                            component="img"
                            className="fadeIn"
                            image={img}
                            alt={img}
                          />
                          <CardActions>
                            <Button
                              fullWidth
                              color="error"
                              onClick={() => onDeleteImage(img)}
                            >
                              Borrar
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" justifyContent="space-around">

                  <FormGroup>
                    <FormLabel>Tallas</FormLabel>
                    {validSizes.map((size) => (
                      <FormControlLabel
                        key={size}
                        control={
                          <Checkbox checked={getValues("sizes") && getValues("sizes").includes(size)} />
                        }
                        label={size}
                        onChange={() => {
                          onChangeSize(size);
                          getValues("sizes") && getValues("sizes").includes(size) &&
                            onDeleteTallas(size);
                        }}
                      />
                    ))}
                  </FormGroup>


                  <FormGroup>
                    <Box display="flex" justifyContent="center">
                      <Button variant="contained" color="secondary"
                        onClick={() => {


                          console.log(getValues('sizes'))

                        }}
                      >
                        Enviar
                      </Button>
                    </Box>
                  </FormGroup>

                </Box>
              </Grid>
            </Grid>
          </form>
        </>)
        : (<>
          no estas autorizado
        </>)
      }
    </AdminLayout>



  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = "" } = query;

  let product

  if (slug === "new") {
    const tempProduct: FormData = {
      title: '',
      description: '',
      images: ["https://res.cloudinary.com/djk4q3tys/image/upload/v1686040726/shh7ufqpxuywai67lxwe.jpg", "https://res.cloudinary.com/djk4q3tys/image/upload/v1686040710/mk27c2fgicm67crrgya5.jpg"],
      inStock: 0,
      price: 0,
      sizes: [],
      slug: '',
      tags: [],
      type: '',
      gender: '',
      popular: false,

    }
    // JSON.parse(JSON.stringify(new Product()));
    // delete tempProduct._id;
    // tempProduct.images = [
    //   "https://res.cloudinary.com/djk4q3tys/image/upload/v1649803292/ayamwt6hdthkkqnhyhkw.jpg",
    //   "https://res.cloudinary.com/djk4q3tys/image/upload/v1649803292/ayamwt6hdthkkqnhyhkw.jpg",
    // ];
    product = tempProduct;
  } else {
    product = await dbProducts.getProductBySlug(slug.toString());
  }

  if (!product && product != undefined) {
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;