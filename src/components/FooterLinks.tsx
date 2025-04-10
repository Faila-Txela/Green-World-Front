import { Link } from "react-router-dom";

type LinkItem = {
  label: string;
  link: string;
};

type LinkGroup = {
  title: string;
  links: LinkItem[];
};

export default function FooterLinks({ data }: { data: LinkGroup[] }) {
  return (
    <div className="flex gap-10 flex-wrap">
      {data.map((group, i) => (
        <div key={i} className="flex flex-col gap-2 min-w-[150px]">
          <h4 className="font-semibold text-green-500">{group.title}</h4>
          {group.links.map(({ label, link }, j) =>
            link.startsWith("http") ? (
              <a
                key={j}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-white/80 hover:text-white transition"
              >
                {label}
              </a>
            ) : (
              <Link
                key={j}
                to={`${link}`}
                className="hover:underline text-white/80 hover:text-white transition"
              >
                {label}
              </Link>
            )
          )}
        </div>
      ))}
    </div>
  );
}

