import * as yup from 'yup';

export const campaignFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  dateStart: yup.string().required('Start date is required'),
  dateEnd: yup.string(),
});
