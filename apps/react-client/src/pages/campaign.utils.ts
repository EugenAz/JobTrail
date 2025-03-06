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
  if (Object.values(ApplicationStatus).includes(status) === false) {
    return applications;
  }
  return applications.filter((a) => a.status.toLowerCase() === status);
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

export const getStatusName = (status: ApplicationStatus) => {
  switch (status.toLowerCase()) {
    case ApplicationStatus.OPEN:
      return 'Open';
    case ApplicationStatus.IN_PROGRESS:
      return 'In Progress';
    case ApplicationStatus.CLOSED:
      return 'Closed';
    case ApplicationStatus.EXPIRED:
      return 'Expired';
    case ApplicationStatus.REJECTED:
      return 'Rejected';
    default:
      return 'Unknown';
  }
};
