import { Link, useParams } from 'react-router';
import { MainHeading } from '../components/atoms/main-heading';
import { LoadingErrorHandler } from '../components/loading-error-handler';
import { useCampaignGetter } from '../graphql/use-campaign-getter';
import { ApplicationStatus } from '@job-trail/types';
import cx from 'classnames';

export const CampaignAnalytics = () => {
  const { campaignId } = useParams();

  if (!campaignId) {
    throw new Error('campaign ID is missing');
  }

  const { loading, error, data } = useCampaignGetter(campaignId);
  const campaign = data?.campaign;

  const statusesQtyReport: Record<ApplicationStatus, number> | undefined =
    campaign?.applications?.reduce(
      (acc, app) => {
        acc[app.status] = acc[app.status] + 1 || 1;
        return acc;
      },
      {} as Record<ApplicationStatus, number>
    );

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      <MainHeading>Analytics for {campaign?.name}</MainHeading>
      <Link className="underline" to={`/campaign/${campaignId}`}>
        To the campaign
      </Link>

      <article className="pt-8">
        <section className="pb-4">
          <p>
            Total applications:{' '}
            <span className="text-2xl">{campaign?.applications?.length}</span>
          </p>
        </section>

        <section className="pb-4">
          <h4 className="font-bold">By status</h4>
          {statusesQtyReport && (
            <ul>
              {Object.entries(statusesQtyReport).map(([status, qty]) => (
                <li
                  key={status}
                  className={cx({
                    'text-red-500':
                      status === ApplicationStatus.REJECTED.toUpperCase(),
                    'text-blue-600':
                      status === ApplicationStatus.OPEN.toUpperCase(),
                    'text-yellow-500':
                      status === ApplicationStatus.EXPIRED.toUpperCase() ||
                      status === ApplicationStatus.CLOSED.toUpperCase(),
                  })}
                >
                  {status}: {qty}
                </li>
              ))}
            </ul>
          )}
        </section>
      </article>
    </LoadingErrorHandler>
  );
};
