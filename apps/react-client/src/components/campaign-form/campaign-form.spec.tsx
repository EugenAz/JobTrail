import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CampaignForm } from './campaign-form';
import { ICampaignSummaryModel } from '@job-trail/types';

const mockOnSubmit = vi.fn();

const initialData: ICampaignSummaryModel = {
  id: '1',
  name: 'Test Campaign',
  dateStart: '2023-01-01',
  dateEnd: '2023-12-31',
};

describe('CampaignForm', () => {
  it.skip('renders the form with initial data', () => {
    render(<CampaignForm initialData={initialData} onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText('Name')).toHaveValue('Test Campaign');
    expect(screen.getByLabelText('Start date')).toHaveValue('2023-01-01');
    expect(screen.getByLabelText('End date')).toHaveValue('2023-12-31');
  });

  it.skip('renders the form without initial data', () => {
    render(<CampaignForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Start date')).toHaveValue(
      new Date().toISOString().split('T')[0]
    );
    expect(screen.getByLabelText('End date')).toHaveValue('');
  });

  it.only('submits the form with correct data', () => {
    render(<CampaignForm initialData={initialData} onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Updated Campaign' },
    });
    fireEvent.change(screen.getByLabelText('Start date'), {
      target: { value: '2023-02-01' },
    });
    fireEvent.change(screen.getByLabelText('End date'), {
      target: { value: '2023-11-30' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /Save/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Updated Campaign',
      dateStart: '2023-02-01',
      dateEnd: '2023-11-30',
    });
  });
});
