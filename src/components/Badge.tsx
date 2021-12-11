import React from "react";

interface BadgeProps {
  content: string,
  colorIndex?: number
}

const badgeText = {
  question: 'text-red-600',
  info: 'text-green-600',
  ad: 'text-yellow-600',
  job: 'text-purple-600',
  industrial: 'text-teal-600',
  residential: 'text-orange-600',
  disposal: 'text-pink-600',
  rental: 'text-lime-600',
  legal: 'text-violet-600',
  issue: 'text-blue-600',
  investment: 'text-gray-600',
};

const badgeBackground = {
  question: 'bg-red-200',
  info: 'bg-green-200',
  ad: 'bg-yellow-200',
  job: 'bg-purple-200',
  industrial: 'bg-teal-200',
  residential: 'bg-orange-200',
  disposal: 'bg-pink-200',
  rental: 'bg-lime-200',
  legal: 'bg-violet-200',
  issue: 'bg-blue-200',
  investment: 'bg-gray-200',
};

const Badge: React.FC<BadgeProps> = ({
  content,
  colorIndex
}) => {

  return (
    <div className={`px-2 py-0.5 text-xs rounded-full font-bold ${badgeText[content as keyof typeof badgeText]} ${badgeBackground[content as keyof typeof badgeBackground]}`}>
      {content}
    </div> 
  );
}

export default Badge;