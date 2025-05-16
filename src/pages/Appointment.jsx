import React from 'react';
import { Table } from 'antd';
import { createStyles } from 'antd-style';
import { useQuery } from 'react-query';
import { getAppointment } from '../Apis/Appointment/appointmentApi';


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



function Appointment() {
    const { styles } = useStyle();
    const { data,isLoading } = useQuery('getAppointment', getAppointment)
    

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
                dataSource={data?.data}
                loading={isLoading}
                scroll={{ x: 'max-content', y: 90 * 5 }}

            />
        </div>
    )
}

export default Appointment