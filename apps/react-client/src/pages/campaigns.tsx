import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router';

const GET_CAMPAIGNS = gql`
  query GetCampaigns {
    campaigns {
      id
      name
    }
  }
`;

export const Campaigns = () => {
  const { loading, error, data } = useQuery(GET_CAMPAIGNS);

  // TODO: Add campaign / Delete campaign

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    <p>{error.message}</p>;
  }

  return (
    <>
      <h1>Campaings</h1>
      <ul>
        {data?.campaigns.map((c: any) => (
          <Link to={'/campaign/' + c.id} key={c.id}>
            {c.name}
          </Link>
        ))}
      </ul>
    </>
  );
};
