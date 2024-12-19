import { Link } from 'react-router';
import { useCampaignsGetter } from '../graphql/use-campaigns-getter';
import { MainHeading } from '../components/atoms/main-heading';

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
    <div className="container mx-auto p-12 shadow-lg h-svh bg-gray-50">
      <MainHeading>Campaings</MainHeading>
      <ul className="flex gap-6 flex-wrap">
        {data?.campaigns.map((c) => (
          <li key={c.id}>
            <Link
              to={'/campaign/' + c.id}
              className="p-8 border border-gray-200 rounded-lg shadow-md hover:shadow-sm block"
            >
              {c.name}
              <span className="block text-xs  text-gray-500 mt-2">
                {c.dateStart} - {c.dateEnd ? c.dateEnd : 'Present'}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
