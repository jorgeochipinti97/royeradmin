import { ConfirmationNumberOutlined } from "@mui/icons-material";
import {
  Chip,
  Grid,
  Button,
  Box,
  Typography,
  TextField,
  capitalize,
  Card,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { tesloApi } from "../../api";

import { AdminLayout } from "../../components/layouts";
import { IOrder, IUser } from "../../interfaces";
import { useEffect, useState } from "react";

const handleShipping = async (orderId: string) => {
  const orders = await tesloApi.get("/orders");

  const a: IOrder[] = orders.data;

  const b = a.filter((e) => e._id == orderId);

  const c = b.map(async (e) => {
    const order_ = {
      _id: e._id,
      isShipping: true,
    };

    await tesloApi({
      url: "/orders",
      method: "PUT",
      data: order_,
    });
  });
  window.location.reload();
};
const handlePay = async (orderId: string) => {
  const orders = await tesloApi.get("/orders");

  const a: IOrder[] = orders.data;

  const b = a.filter((e) => e._id == orderId);

  const c = b.map(async (e) => {
    const order_ = {
      _id: e._id,
      isPaid: true,
    };

    await tesloApi({
      url: "/orders",
      method: "PUT",
      data: order_,
    });
    window.location.reload();
  });
};

const columns: GridColDef[] = [
  { field: "id", headerName: "Orden ID", width: 250 },
  {
    field: "check",
    headerName: "Ver orden",
    renderCell: ({ row }: any) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
          Ver orden
        </a>
      );
    },
  },
  { field: "total", headerName: "Monto total", width: 100, align: "center" },
  {
    field: "isPaid",
    headerName: "Pago",
    width: 150,
    align: "center",
    renderCell: ({ row }: any) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Paga" color="success" />
      ) : (
        <Button color="success" onClick={() => handlePay(row.id)}>
          Poner como paga
        </Button>
      );
    },
  },
  {
    field: "transtactionId",
    headerName: "Transaction ID",
    align: "center",
    width: 150,
  },
  {
    field: "noProducts",
    headerName: "No.Productos",
    align: "center",
    width: 150,
  },
  {
    field: "isShipping",
    headerName: "Shipping",
    align: "center",
    width: 250,
    renderCell: ({ row }: any) => {
      return row.isShipping ? (
        <Chip variant="outlined" label="enviado" color="success" />
      ) : (
        <Button color="success" onClick={() => handleShipping(row.id)}>
          Poner como enviado
        </Button>
      );
    },
  },

  { field: "createdAt", headerName: "Creada en", width: 300, align: "center" },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");
  const [ordersFilter, setOrdersFilter] = useState(error ? [] : data);
  if (!data && !error) return <></>;
  const rows = data!.map((order) => ({
    id: order._id,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    transtactionId: order.transactionId,
    orderItems: order.orderItems.map((e) => e.title),
    createdAt: new Date(order.createdAt!).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    isShipping: order.isShipping,
  }));

  const ordenesPagas = data!.filter((e) => e.isPaid);

  const searchOrders = (filter: string, key: string) => {
    const ordersByName: IOrder[] = data
      ? data.filter(
          (e) =>
            e.shippingAddress.firstName
              .toLowerCase()
              .includes(key.toLocaleLowerCase()) ||
            e.shippingAddress.lastName
              .toLowerCase()
              .includes(key.toLocaleLowerCase())
        )
      : [];

    const ordersByLastName: IOrder[] = data
      ? data.filter((e) =>
          e.shippingAddress.lastName
            .toLowerCase()
            .includes(key.toLocaleLowerCase())
        )
      : [];

    const ordersById: IOrder[] = data
      ? data.filter((e) => e._id && e._id.includes(key))
      : [];
    const ordersByEmail: IOrder[] = data
      ? data.filter((e) => e.shippingAddress.email && e.shippingAddress.email.includes(key))
      : [];

    filter == "nombre" && setOrdersFilter(ordersByName);
    filter == "apellido" && setOrdersFilter(ordersByLastName);
    filter == "id" && setOrdersFilter(ordersById);
    filter == "email" && setOrdersFilter(ordersByEmail);

  };

  return (
    <AdminLayout
      title={"Ordenes"}
      subTitle={"Mantenimiento de ordenes"}
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }} display='flex' justifyContent='center'>
        <Box display="flex" flexDirection="column">
          <Box sx={{ mt: 3 }}>
            <Box sx={{ mt: 3 }}>
              <TextField
                label="ID"
                onChange={(e) => searchOrders("id", e.target.value)}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <TextField
                label="Nombre"
                onChange={(e) => searchOrders("nombre", e.target.value)}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <TextField
                label="Apellido"
                onChange={(e) => searchOrders("apellido", e.target.value)}
              />
            </Box>
            <Box sx={{ mt: 3 }}>
              <TextField
                label="Email"
                onChange={(e) => searchOrders("email", e.target.value)}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Grid container>
        {ordersFilter &&
          ordersFilter.map((e) => (
            <Grid item xs={4} sx={{ width: "100%", mt: 2 }} key={e._id}>
              <Box display="flex" justifyContent="center">
                <Card sx={{ p: 3 }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle1">{e._id}</Typography>
                    <Typography variant="subtitle1">
                      {capitalize(e.shippingAddress.firstName)}{" "}
                      {capitalize(e.shippingAddress.lastName)}
                    </Typography>
                    <Typography variant="subtitle1">
                      {e.shippingAddress.country}
                    </Typography>
                    <Typography variant="subtitle1">
                      {new Date(e.createdAt!).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: e.isPaid ? "green" : "red" }}
                    >
                      {e.isPaid ? "Paga" : "No Paga"}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: e.isPaid ? "green" : "red" }}
                    >
                      {e.isPaid && ` $${e.total} USD`}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: e.isPaid ? "green" : "red" }}
                    >
                      {e.isPaid && `${e.transactionId}`}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </Grid>
          ))}
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
