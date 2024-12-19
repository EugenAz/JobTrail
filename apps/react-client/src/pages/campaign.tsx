import { Link, useParams } from 'react-router';
import { formatDate } from '@job-trail/dates';
import { useApplicationDeleter } from '../graphql/use-application-deleter';
import { useCampaignGetter } from '../graphql/use-campaign-getter';
import { MainHeading } from '../components/atoms/main-heading';
import { ButtonLink } from '../components/atoms/button-link';

import styles from './campaign.module.css';

export const Campaign = () => {
  const { campaignId } = useParams();

  if (!campaignId) {
    throw new Error('campaign ID is missing');
  }

  const { loading, error, data, refetch } = useCampaignGetter(campaignId);
  const [
    deleteApplication,
    { loading: mutationLoading, error: mutationError },
  ] = useApplicationDeleter();

  // TODO sort by date and status

  if (loading || mutationLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    <p>{error.message}</p>;
  }

  // TODO error strategy
  if (mutationError) {
    <p>{mutationError.message}</p>;
  }

  if (!data) {
    throw new Error('campaign data is unavailable');
  }

  const campaign = data.campaign;
  const applications = campaign?.applications;

  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      const response = await deleteApplication({
        variables: {
          id,
        },
      });

      if (response.data.deleteApplication) {
        await refetch();
      }
    }
  };

  // TODO search by role names and company names

  return (
    <div>
      <MainHeading>{campaign.name}</MainHeading>

      <ButtonLink to={`/campaign/${campaignId}/new-application`}>
        + Add application
      </ButtonLink>

      <table className="mt-4 rounded-t-lg overflow-hidden">
        <thead className="bg-purple-600 text-center">
          <tr>
            <th className={styles.thStyle}>Date</th>
            <th className={styles.thStyle}>Company</th>
            <th className={styles.thStyle}>Role</th>
            <th className={styles.thStyle}>Status</th>
            <th className={styles.thStyle}>Date Updated</th>
            <th className={styles.thStyle}></th>
          </tr>
        </thead>
        <tbody>
          {applications?.map((a) => (
            <tr key={a.id}>
              <td className={styles.tdStyle}>{formatDate(a.dateCreated)}</td>
              <td className={styles.tdStyle2}>{a.company.name}</td>
              <td className={styles.tdStyle}>{a.roleName}</td>
              <td className={styles.tdStyle2}>{a.status}</td>
              <td className={styles.tdStyle}>
                {a.dateUpdated ? formatDate(a.dateUpdated) : '-'}
              </td>
              <td className={styles.tdStyle2}>
                <div className="flex gap-2 justify-center">
                  <Link
                    className="underline text-blue-600"
                    to={`/application/${a.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="underline text-red-600"
                    onClick={() => handleDeleteClick(a.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
