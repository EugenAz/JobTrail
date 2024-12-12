import {useQuery, gql} from '@apollo/client';
import { useForm, SubmitHandler } from "react-hook-form"
import { useParams } from 'react-router';

const GET_APPLICATION = (id: string) => gql`
  query GetApplication {
    application(id: "${id}") {
      roleName
      status
      dateCreated
      dateUpdated
      notes
      link
      company {
        id
        name
      }
      campaign {
        id
        name
      }
    }
  }
`;

export const ApplicationForm = () => {
  let { applicationId } = useParams();
  const { loading, error, data } = useQuery(GET_APPLICATION(applicationId));
  const onSubmit: SubmitHandler<any> = (data) => console.log(data)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>()

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    <p>{error.message}</p>
  }

  const application = data.application;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Role Name:
        <input>{application.roleName}</input>
      </label>
      <label>
        Company:
        <input>{application.company.name}</input>
      </label>
      <td>{a.dateCreated}</td>
      <td>{a.company.name}</td>
      <td>{a.roleName}</td>
      <td>{a.status}</td>
      <td>{a.dateUpdated}</td>
    </form>
  )
}
