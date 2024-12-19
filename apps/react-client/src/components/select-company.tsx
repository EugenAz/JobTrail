import { forwardRef, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useCompanyCreator } from '../graphql/use-company-creator';
import { useCompaniesGetter } from '../graphql/use-companies-getter';

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (companyName: string, companyId: string) => ({
  label: companyName,
  value: companyId,
});

interface SelectCompanyProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const SelectCompany = forwardRef<HTMLSelectElement, SelectCompanyProps>(
  ({ value, onChange, error }, ref) => {
    const [options, setOptions] = useState<Option[]>([]);
    const [createCompany, { loading: mutationLoading, error: mutationError }] =
      useCompanyCreator();
    const {
      loading: fetchingLoading,
      error: fetchError,
      data,
    } = useCompaniesGetter();

    // TODO sort alphabetically

    if (fetchError) {
      <p>{fetchError.message}</p>;
    }

    if (mutationError) {
      <p>{mutationError.message}</p>;
    }

    useEffect(() => {
      if (data?.companies) {
        setOptions(data.companies.map((c: any) => createOption(c.name, c.id)));
      }
    }, [data?.companies]);

    const handleCreate = async (inputValue: string) => {
      const response = await createCompany({ variables: { name: inputValue } });

      const newCompanyId = response.data.createCompany.id;

      setOptions((prev) => [...prev, createOption(inputValue, newCompanyId)]);

      onChange(newCompanyId);
    };

    const optionValue = options.find((o) => value === o.value);

    // TODO fix select company field rendering on Application Save (submit)

    return (
      <>
        <CreatableSelect
          placeholder="Select a Company"
          isClearable
          isDisabled={fetchingLoading || mutationLoading}
          isLoading={fetchingLoading || mutationLoading}
          onCreateOption={handleCreate}
          options={options}
          isMulti={false}
          onChange={(option: Option) => onChange(option.value)}
          value={optionValue}
        />
        {error && <p>{error}</p>}
      </>
    );
  }
);
