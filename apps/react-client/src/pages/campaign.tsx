import { useQuery, gql } from '@apollo/client';
import { Link, useParams } from 'react-router';
import { formatDate } from '../utils/dates';

const GET_CAMPAIGN = (id: string) => gql`
  query GetCampaign {
    campaign(id: "${id}") {
      id
      name
      applications {
        id
        roleName
        status
        dateCreated
        dateUpdated
        company {
          name
        }
      }
    }
  }
`;

export const Campaign = () => {
  let { campaignId } = useParams();
  const { loading, error, data } = useQuery(GET_CAMPAIGN(campaignId));

  // TODO sort by date and status

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    <p>{error.message}</p>;
  }

  const campaign = data.campaign;
  const applications = campaign.applications;

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
          {applications.map((a: any) => (
            <tr key={a.id}>
              <td>{formatDate(a.dateCreated)}</td>
              <td>{a.company.name}</td>
              <td>{a.roleName}</td>
              <td>{a.status}</td>
              <td>{a.dateUpdated ? formatDate(a.dateUpdated) : '-'}</td>
              <td>
                <Link to={`/application/${a.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
