import { Link } from 'react-router';
import { useCampaignsGetter } from '../graphql/use-campaigns-getter';

export const Campaigns = () => {
  const { loading, error, data } = useCampaignsGetter();

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
