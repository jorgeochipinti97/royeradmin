import type { NextPage } from "next";
import useSWR from "swr";
import { AdminLayout } from "../components/layouts/AdminLayout";
import {
  AirplaneTicketOutlined,
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { IOrder } from "../interfaces";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";

const Home: NextPage = () => {
  // const { data, error } = useSWR<IOrder[]>("/api/admin/orders");
  const [total_, setTotal_] = useState(0);
  const { error, isLoading, user } = useUser()
  useEffect(() => {
    console.log(error)
  }, [])

  return (
    <>
      <AdminLayout title="" subTitle={``} icon={<AirplaneTicketOutlined />}>
        <>

        </>
      </AdminLayout>
    </>
  );
};

export default Home;
