import { Table } from 'antd';
import { createStyles } from 'antd-style';
import { useQuery } from 'react-query';
import { getAppointment } from '../Apis/Appointment/appointmentApi';
import { useMemo } from 'react';

const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
        customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
    };
});


function Appointment() {
    const { styles } = useStyle();
    const { data,isLoading } = useQuery('getAppointment', getAppointment)


    const user = JSON.parse(localStorage.getItem('user'));
    const userType = user?.Role;
    const userId = user?.id;

   const filteredData = useMemo(() => {
    if (!data?.data) return [];

    if (userType === 'Admin') {
        return data.data;
    }

    if (userType === 'Doctor') {
        return data.data.filter(item => {
            const itemDoctorId = typeof item.DoctorId === 'string'
                ? item.DoctorId
                : item.DoctorId?._id;

            return itemDoctorId === userId;
        });
    }

    return [];
}, [data, userType, userId]);

    

    const columns = [
    {
        title: 'Name',
        width: 200,
        dataIndex: 'Name',
        fixed: 'left',
        key: '1',
    },
    {
        title: 'Gender',
        width: 100,
        dataIndex: 'Gender',
        key: '2',
    },
    {
        title: 'Email',
        dataIndex: 'Email',
        key: '3',
        width: 200,
    },
    {
        title: 'Phone',
        dataIndex: 'Phone',
        key: '4',
        width: 150,
    },
    {
        title: 'Date',
        dataIndex: 'Date',
        key: '5',
        width: 150,
    },
    {
        title: 'Time',
        dataIndex: 'Time',
        key: '6',
        width: 150,
    },
    {
        title: 'Doctor',
        dataIndex: 'Doctor',
        key: '7',
        width: 150,
    },
    {
        title: 'Department',
        dataIndex: 'Department',
        key: '8',
        width: 150,
    },
    {
        title: 'Message',
        dataIndex: 'Message',
        key: '9',
        width: 250,
    }
];



    return (
        <div>
            <Table
                className={styles.customTable}
                columns={columns}
                dataSource={filteredData}
                loading={isLoading}
                scroll={{ x: 'max-content', y: 90 * 5 }}

            />
        </div>
    )
}

export default Appointment