// components/PillarCard.tsx

import Link from "next/link";
import { themeMap, type ThemeName } from "./themes";

interface PillarCardProps {
  title: string;
  description: string;
  href: string;
  color: ThemeName;
}

const PillarCard: React.FC<PillarCardProps> = ({
  title,
  description,
  href,
  color,
}) => {
  const theme = themeMap[color];

  return (
    <Link
      href={href}
      className="block p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
    >
      <h3 className={`text-xl font-extrabold ${theme.title} mb-2`}>{title}</h3>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      <span className={`text-sm font-semibold ${theme.link}`}>
        View Insights &rarr;
      </span>
    </Link>
  );
};

export default PillarCard;
