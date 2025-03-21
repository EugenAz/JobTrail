import { Link, useParams, useSearchParams } from 'react-router';
import { formatDate } from '@job-trail/dates';
import { PresentationChartLineIcon } from '@heroicons/react/16/solid';

import { useApplicationDeleter } from './api/use-application-deleter';
import { useCampaignGetter } from '@/api/use-campaign-getter';
import { LoadingErrorHandler } from '../common/loading-error-handler';

import { useEffect, useMemo, useState } from 'react';
import { ApplicationStatus, IApplicationModel } from '@job-trail/types';
import {
  getFilteredApplications,
  STATUS_FILTER_KEY,
  getStatusName,
} from './campaign.utils';
import { SearchInput } from '../common/search-input';
import { MainHeading } from '../common/atoms/main-heading';
import { ButtonLink } from '../common/atoms/button-link';
import { ApplicationsFilter } from './types';

export const Campaign = () => {
  const { campaignId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterParams, setFilterParams] = useSearchParams();
  const filterStatus = filterParams.get(STATUS_FILTER_KEY) as ApplicationStatus;
  const [filteredApplications, setFilteredApplications] = useState<
    IApplicationModel[]
  >([]);

  if (!campaignId) {
    throw new Error('campaign ID is missing');
  }

  const { loading, error, data, refetch } = useCampaignGetter(campaignId);
  const [
    deleteApplication,
    { loading: mutationLoading, error: mutationError },
  ] = useApplicationDeleter();

  const campaign = data?.campaign;
  const applications = campaign?.applications;

  useEffect(() => {
    const filteredApps = getFilteredApplications(
      applications as IApplicationModel[],
      filterStatus,
      searchTerm
    );
    setFilteredApplications(filteredApps);
  }, [applications, filterStatus, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim().toLowerCase());
  };

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterParams((prev) => {
      switch (e.target.value as unknown as ApplicationsFilter) {
        case ApplicationsFilter.ALL:
          prev.delete(STATUS_FILTER_KEY);
          break;
        case ApplicationsFilter.OPEN:
          prev.set(STATUS_FILTER_KEY, ApplicationStatus.OPEN);
          break;
        case ApplicationsFilter.IN_PROGRESS:
          prev.set(STATUS_FILTER_KEY, ApplicationStatus.IN_PROGRESS);
          break;
        case ApplicationsFilter.OFFER:
          prev.set(STATUS_FILTER_KEY, ApplicationStatus.OFFER);
          break;
      }

      return prev;
    });
  };

  const gotOffer = useMemo(
    () => applications?.some((a) => a.status === ApplicationStatus.OFFER),
    [applications]
  );

  return (
    <LoadingErrorHandler
      loading={loading || mutationLoading}
      error={error || mutationError}
    >
      <Link to="/" className="text-blue-600 underline">
        all campaigns
      </Link>
      <div className="flex gap-2">
        <MainHeading>{campaign?.name} /</MainHeading>
        <Link to={`analytics`} className="mt-1">
          <PresentationChartLineIcon className="w-7 text-blue-500" />
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <ButtonLink to={`/campaign/${campaignId}/new-application`}>
          + Add application
        </ButtonLink>
        Show:
        <select
          onChange={handleFilterChange}
          className="p-2 border-gray-600 border-solid border-2 rounded-md"
        >
          <option value={ApplicationsFilter.ALL}>All</option>
          <option value={ApplicationsFilter.OPEN}>Open</option>
          <option value={ApplicationsFilter.IN_PROGRESS}>In Progress</option>
          {gotOffer ? (
            <option value={ApplicationsFilter.OFFER}>Offer</option>
          ) : null}
        </select>
        <SearchInput handleSearch={handleSearch} searchTerm={searchTerm} />
      </div>

      <table className="mt-4 rounded-t-lg overflow-hidden">
        <thead className="text-center">
          <tr>
            <th className="bg-gray-500 w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-2 lg:px-4">
              Date
            </th>
            <th className="bg-gray-500 w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-2 lg:px-4">
              Company
            </th>
            <th className="bg-gray-500 w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-2 lg:px-4">
              Role
            </th>
            <th className="bg-gray-500 w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-2 lg:px-4">
              Status
            </th>
            <th className="bg-gray-500 w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-2 lg:px-4">
              Date Updated
            </th>
            <th className="bg-gray-500 w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-2 lg:px-4"></th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications?.map((a) => (
            <tr key={a.id}>
              <td className="border-b border-[#E8E8E8] py-5 px-2 text-center text-base font-medium">
                {formatDate(a.dateCreated)}
              </td>
              <td className="border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium">
                {a.company.name}
              </td>
              <td className="border-b border-[#E8E8E8] py-5 px-2 text-center text-base font-medium">
                <a
                  className="underline hover:no-underline text-blue-600"
                  href={a.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {a.roleName}
                </a>
              </td>
              <td className="border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium">
                {getStatusName(a.status)}
              </td>
              <td className="border-b border-[#E8E8E8] py-5 px-2 text-center text-base font-medium">
                {a.dateUpdated ? formatDate(a.dateUpdated) : '-'}
              </td>
              <td className="border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium">
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
    </LoadingErrorHandler>
  );
};
