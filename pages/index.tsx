import type { NextPage } from 'next'

import { AdminLayout } from '../components/layouts/AdminLayout';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

const Home: NextPage = () => {
  return (
<>
<AdminLayout
            title=''
            subTitle={``}
            icon={<AirplaneTicketOutlined />}
        >

        </AdminLayout>
</>
  )
}

export default Home
