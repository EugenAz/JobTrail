import cx from 'classnames';
import { Link } from 'react-router';
import {
  PencilSquareIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/16/solid';
import { useCampaignsGetter } from './api/use-campaigns-getter';
import styles from './campaigns.module.css';
import { LoadingErrorHandler } from '../common/loading-error-handler';
import { MainHeading } from '../common/atoms/main-heading';
import { TileLink } from '../common/atoms/tile-link';
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export const Campaigns = () => {
  const { loading, error, data } = useCampaignsGetter();

  // TODO: Delete campaign

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      <MainHeading>Campaings</MainHeading>
      <ul className="flex gap-6 flex-wrap pt-8">
        {data?.campaigns.map((c) => (
          <li key={c.id}>
            <Card
              className={cx(styles.tile, 'relative group overflow-hidden', {
                'bg-gray-100': c.dateEnd && new Date(c.dateEnd) < new Date(),
              })}
            >
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex">
                <Link
                  className="w-[50%] flex items-center justify-center text-white border-white border-r-1"
                  to={'/campaign/' + c.id}
                >
                  <ArrowRightEndOnRectangleIcon className="size-10" />
                </Link>
                <Link
                  className="w-[50%] flex items-center justify-center text-white"
                  to={`/campaign/${c.id}/edit`}
                >
                  <PencilSquareIcon className="size-10" />
                </Link>
              </div>
              <CardHeader>
                <CardTitle>{c.name}</CardTitle>
              </CardHeader>
              <CardFooter>
                <span className="block text-xs  text-gray-500 mt-2">
                  {c.dateStart} - {c.dateEnd ? c.dateEnd : 'Present'}
                </span>
              </CardFooter>
            </Card>
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
