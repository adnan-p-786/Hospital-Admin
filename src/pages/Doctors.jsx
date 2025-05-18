import { Card, Spin } from 'antd';
import { useQuery } from 'react-query';
import { getDoctor, postDoctor } from '../Apis/Doctor/doctorApi';

const { Meta } = Card;

function Doctors() {
  const { data, isLoading, isError } = useQuery('getDoctor', getDoctor); 
  // const { mutate: Create } = postDoctor(); 

  if (isLoading) return <Spin tip="Loading doctors..." />;
  if (isError) return <p>Error loading doctors</p>;

  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
    {Array.isArray(data) && data.length > 0 ? (
      data.map((doctor) => (
        <Card
          key={doctor._id}
          style={{ width: 250, height: 350 }}
          cover={
            <img
              className="h-[200px] object-cover"
              alt={doctor.Name}
              src={doctor.image}
            />
          }
        >
          <Meta
            className="text-[18px] text-center"
            title={doctor.Name}
            description={doctor.Department}
          />
        </Card>
      ))
    ) : (
      <p>No doctors found.</p>
    )}
  </div>
  );
}

export default Doctors;
