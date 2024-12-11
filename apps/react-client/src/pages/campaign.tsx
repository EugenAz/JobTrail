import {useQuery, gql} from '@apollo/client';
import { useParams } from 'react-router';

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

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    <p>{error.message}</p>
  }

  const campaign = data.campaign;
  const applications = campaign.applications;

  return (
    <div>
      <h2>{campaign.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Date Updated</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((a: any) => <tr key={a.id}>
            <td>{a.dateCreated}</td>
            <td>{a.company.name}</td>
            <td>{a.roleName}</td>
            <td>{a.status}</td>
            <td>{a.dateUpdated}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}
