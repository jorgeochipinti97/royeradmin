import type { NextPage } from "next";
import useSWR from "swr";
import { AdminLayout } from "../components/layouts/AdminLayout";
import {
  AirplaneTicketOutlined,
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { IOrder } from "../interfaces";
import { useState,useEffect } from "react";
import { Typography } from "@mui/material";

const Home: NextPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");
  const [total_, setTotal_] = useState(0);


  return (
    <>
      <AdminLayout title="" subTitle={``} icon={<AirplaneTicketOutlined />}>
        <><Typography variant="h1">{
        // data && data.reduce((a, b) => a + b, 0) )        
        }</Typography></>
      </AdminLayout>
    </>
  );
};

export default Home;
