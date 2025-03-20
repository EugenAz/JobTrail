import { useCampaignsGetter } from './api/use-campaigns-getter';
import { LoadingErrorHandler } from '../common/loading-error-handler';
import { MainHeading } from '../common/atoms/main-heading';
import { TileLink } from '../common/atoms/tile-link';
import { Campaign } from './campaign';

export const Campaigns = () => {
  const { loading, error, data } = useCampaignsGetter();

  // TODO: Delete campaign

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      <MainHeading>Campaings</MainHeading>
      <ul className="flex gap-6 flex-wrap pt-8">
        {data?.campaigns.map((c) => (
          <li key={c.id}>
            <Campaign campaign={c} />
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
