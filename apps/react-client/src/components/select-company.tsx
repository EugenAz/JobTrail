import { forwardRef } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_COMPANIES = gql`
  query GetCompanies {
    companies {
      id
      name
    }
  }
`;

interface SelectCompanyProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const SelectCompany = forwardRef<HTMLSelectElement, SelectCompanyProps>(
  ({ value, onChange, error }, ref) => {
    const { loading, error: fetchError, data } = useQuery(GET_COMPANIES);

    // TODO sort alphabetically

    if (loading) {
      return <p>Loading...</p>;
    }

    if (fetchError) {
      <p>{fetchError.message}</p>;
    }

    return (
      <>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          ref={ref}
        >
          <option value="">Select a Company</option>
          {data.companies.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {error && <p>{error}</p>}
      </>
    );
  }
);
