import router from 'next/router';
import React from 'react'
import { tesloApi } from '../../api';
import { NextPage } from 'next';
import { IDiscount } from '../../interfaces/discountCodes';
import { useEffect, useState } from 'react';
import { Typography, Box, TextField, Button, Grid } from '@mui/material';
import { AdminLayout } from '../../components/layouts';
import useSWR from 'swr';


const Discount: NextPage = () => {
  const [name, setName] = useState('')
  const [percentage, setPercentage] = useState(0)
  const { data, error } = useSWR<IDiscount[]>('/api/discount');
  const codes = data && data
  const onSubmit = async (_name: string, _percentage: number) => {

    try {
      const { data } = await tesloApi({
        url: '/discount',
        method: 'POST',
        data: {
          name: _name.toUpperCase(),
          percentage: _percentage
        }
      });
      console.log({ data });
    } catch (error) {
      console.log(error);
    }

  }
  const onSubmitDelete = async (code_: IDiscount) => {

    try {
      const { data } = await tesloApi({
        url: '/discount',
        method: 'DELETE',
        data: code_
      });
      console.log({ data });
    } catch (error) {
      console.log(error);
    }

  }



  return (

    <>
      <AdminLayout title={'Admin - Discount Codes'} subTitle={''}>
        <Box display='flex' justifyContent='center'>
          <Box display='flex' flexDirection='column'>
            <TextField
              label="Name"
              sx={{ mt: 1 }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Percentage - Max 30%"
              type='number'

              onChange={(e) => setPercentage(parseInt(e.target.value))}
            />
            <Box display='flex' justifyContent='center' sx={{ mt: 3 }}>
              <Button color='success'
                disabled={percentage > 30 ? true : false}
                onClick={() => onSubmit(name, percentage)}
              >
                crear
              </Button>
            </Box>
          </Box>
        </Box>
        <Grid container>

          {
            codes ?
              codes.map(e => (
                <Grid item xs={5} sm={5} md={5} key={e.name} sx={{ border: '1px solid black', m: 2 }}>

                  <Box display='flex' flexDirection='column'>

                    <Box display='flex' justifyContent='center'>
                      <Box sx={{m:1}}>
                        <Typography>{e.name}</Typography>
                      </Box>
                      <Box sx={{m:1}}>
                        <Typography>{e.percentage}%</Typography>
                      </Box>
                    </Box>
                    <Box display='flex' justifyContent='center' sx={{m:2}}>

                      <Button
                        variant='contained'
                        color='error'
                        onClick={() => onSubmitDelete(e)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))

              : <></>
          }
        </Grid>
      </AdminLayout>
    </>

  )
}

export default Discount