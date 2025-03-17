import cx from 'classnames';
import { Link } from 'react-router';
import { PencilSquareIcon } from '@heroicons/react/16/solid';
import { useCampaignsGetter } from './api/use-campaigns-getter';
import styles from './campaigns.module.css';
import { LoadingErrorHandler } from '../common/loading-error-handler';
import { MainHeading } from '../common/atoms/main-heading';
import { TileLink } from '../common/atoms/tile-link';

export const Campaigns = () => {
  const { loading, error, data } = useCampaignsGetter();

  // TODO: Delete campaign

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      <MainHeading>Campaings</MainHeading>
      <ul className="flex gap-6 flex-wrap pt-8">
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
