import { Link } from 'react-router';
import cx from 'classnames';
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
    <>
      <MainHeading>Campaings</MainHeading>
      <ul className="flex gap-6 flex-wrap">
        {data?.campaigns.map((c) => (
          <li key={c.id}>
            <Link
              to={'/campaign/' + c.id}
              className={cx(
                'p-8 border border-gray-200 rounded-lg shadow-md hover:shadow-sm block',
                {
                  'bg-gray-100': c.dateEnd && new Date(c.dateEnd) < new Date(),
                }
              )}
            >
              {c.name}
              <span className="block text-xs  text-gray-500 mt-2">
                {c.dateStart} - {c.dateEnd ? c.dateEnd : 'Present'}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
