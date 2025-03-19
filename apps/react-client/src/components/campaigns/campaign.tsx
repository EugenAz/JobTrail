import { FC } from 'react';
import cx from 'classnames';
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router';
import {
  PencilSquareIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/16/solid';
import { ICampaignDetailModel } from '@job-trail/types';

interface CampaignProps {
  campaign: ICampaignDetailModel;
}

export const Campaign: FC<CampaignProps> = ({ campaign: c }) => {
  return (
    <Card
      className={cx('relative group overflow-hidden', {
        'bg-gray-100': c.dateEnd && new Date(c.dateEnd) < new Date(),
      })}
    >
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex">
        <Link
          className="w-[50%] flex items-center justify-center text-white border-white border-r-1"
          to={'/campaign/' + c.id}
        >
          <ArrowRightEndOnRectangleIcon className="size-10" />
        </Link>
        <Link
          className="w-[50%] flex items-center justify-center text-white"
          to={`/campaign/${c.id}/edit`}
        >
          <PencilSquareIcon className="size-10" />
        </Link>
      </div>
      <CardHeader>
        <CardTitle>{c.name}</CardTitle>
      </CardHeader>
      <CardFooter>
        <span className="block text-xs  text-gray-500 mt-2">
          {c.dateStart} - {c.dateEnd ? c.dateEnd : 'Present'}
        </span>
      </CardFooter>
    </Card>
  );
};
