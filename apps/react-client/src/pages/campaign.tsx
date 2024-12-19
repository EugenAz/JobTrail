import { Link, useParams } from 'react-router';
import { formatDate } from '@job-trail/dates';
import { useApplicationDeleter } from '../graphql/use-application-deleter';
import { useCampaignGetter } from '../graphql/use-campaign-getter';

export const Campaign = () => {
  const { campaignId } = useParams();

  if (!campaignId) {
    throw new Error('campaign ID is missing');
  }

  const { loading, error, data } = useCampaignGetter(campaignId);
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
    if (confirm('Are you sure?')) {
      const response = await deleteApplication({
        variables: {
          id,
        },
      });

      if (response.data.deleteApplication) {
        // TODO invalidate cache of GET_CAMPAIGN query ...
      }
    }
  };

  // TODO introduce search by role names and company names

  return (
    <div>
      <h2>{campaign.name}</h2>

      <Link to={`/campaign/${campaignId}/new-application`}>
        Add application
      </Link>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Date Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {applications?.map((a) => (
            <tr key={a.id}>
              <td>{formatDate(a.dateCreated)}</td>
              <td>{a.company.name}</td>
              <td>{a.roleName}</td>
              <td>{a.status}</td>
              <td>{a.dateUpdated ? formatDate(a.dateUpdated) : '-'}</td>
              <td>
                <Link to={`/application/${a.id}`}>Edit</Link>
                <button onClick={() => handleDeleteClick(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
