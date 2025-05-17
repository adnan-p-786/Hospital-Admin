import { Table } from 'antd';
import { createStyles } from 'antd-style';
import { useQuery } from 'react-query';
import { getAppointment } from '../Apis/Appointment/appointmentApi';
import { getContact } from '../Apis/contact/contactApi';


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
        title: 'Email',
        dataIndex: 'Email',
        key: '3',
        width: 200,
    },
    {
        title: 'Subject',
        dataIndex: 'Subject',
        key: '8',
        width: 250,
    },
    {
        title: 'Message',
        dataIndex: 'Message',
        key: '9',
        width: 250,
    }
];


function Contact() {
    const { styles } = useStyle();
    const { data, isLoading } = useQuery('getContact', getContact)
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

export default Contact