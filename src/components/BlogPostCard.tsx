import { ArrowUpIcon } from "@heroicons/react/outline";
import React from "react";
import { useHistory } from "react-router-dom";

interface BlogPostProps {
  title: string,
  description: string,
  tags?: JSX.Element | JSX.Element[] | undefined,
  upvotes: number,
  date: Date,
  id?: number
}

const BlogPostCard: React.FC<BlogPostProps> = ({
  title,
  description,
  tags,
  upvotes,
  date,
  id
}) => {
  const history = useHistory();

  return (
    <div className='min-h-[64] w-full rounded-md shadow-md p-2 flex flex-col justify-evenly'>
      <div className='text-lg font-black cursor-pointer hover:opacity-50 transition duration-300' onClick={() => id && history.push(`/post/${id}`)}>{title}</div>
      <div className='text-sm text-gray-400'>{description}</div>
      <div className='flex flex-wrap gap-2 mt-2'>
        {tags}
      </div>
      <div className="flex justify-between text-sm font-bold mt-4">
        <div>{`${new Date(date).getDate()}-${new Date(date).getMonth()}-${new Date(date).getFullYear()}`}</div>
        <div className='flex'>{upvotes}<ArrowUpIcon className='w-5 h-5' /></div>
      </div>
    </div>
  );
}

export default BlogPostCard;