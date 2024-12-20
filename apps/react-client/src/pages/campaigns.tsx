import cx from 'classnames';
import { Link } from 'react-router';
import { PencilSquareIcon } from '@heroicons/react/16/solid';
import { useCampaignsGetter } from '../graphql/use-campaigns-getter';
import { MainHeading } from '../components/atoms/main-heading';
import { TileLink } from '../components/atoms/tile-link';
import styles from './campaigns.module.css';
import { LoadingErrorHandler } from '../components/loading-error-handler';

export const Campaigns = () => {
  const { loading, error, data } = useCampaignsGetter();

  // TODO: Delete campaign

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      <MainHeading>Campaings</MainHeading>
      <ul className="flex gap-6 flex-wrap">
        {data?.campaigns.map((c) => (
          <li key={c.id}>
            <TileLink
              to={'/campaign/' + c.id}
              className={cx(styles.tile, {
                'bg-gray-100': c.dateEnd && new Date(c.dateEnd) < new Date(),
              })}
            >
              {c.name}
              <span className="block text-xs  text-gray-500 mt-2">
                {c.dateStart} - {c.dateEnd ? c.dateEnd : 'Present'}
              </span>
              <Link to={`/campaign/${c.id}/edit`} className={styles.editLink}>
                <PencilSquareIcon />
              </Link>
            </TileLink>
          </li>
        ))}
        <li>
          <TileLink
            to="/new-campaign"
            className="shadow-none hover:border-gray-300 border-dashed border-2 border-gray-200"
          >
            + New Campaign
          </TileLink>
        </li>
      </ul>
    </LoadingErrorHandler>
  );
};
