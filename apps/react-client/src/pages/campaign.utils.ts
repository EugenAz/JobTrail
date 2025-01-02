import { ApplicationStatus, IApplicationModel } from '@job-trail/types';

export const STATUS_FILTER_KEY = 'statusFilter';

export const getFilteredApplications = (
  applications: IApplicationModel[],
  status: ApplicationStatus,
  searchTerm: string
) => {
  let filteredApps = filterApplicationsByStatus(applications, status);
  filteredApps = filterApplicationsBySearchTerm(filteredApps, searchTerm);
  return filteredApps;
};

const filterApplicationsByStatus = (
  applications: IApplicationModel[],
  status: ApplicationStatus
) => {
  if (status === ApplicationStatus.OPEN) {
    return applications.filter(
      (a) => a.status.toLowerCase() === ApplicationStatus.OPEN
    );
  }
  return applications;
};

const filterApplicationsBySearchTerm = (
  applications: IApplicationModel[],
  searchTerm: string
) => {
  if (searchTerm) {
    return applications.filter(
      (a) =>
        a.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.roleName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  return applications;
};
