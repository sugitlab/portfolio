import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { useLocale } from "../hooks/locale";

type ProfileContentProps = {
  title: string;
  body: string;
  accentColor: string;
  element?: React.ReactElement;
};

const ProfileContent = (props: ProfileContentProps) => {
  return (
    <div className="flex flex-row gap-4">
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-3 h-3 rounded-full mt-1 ${props.accentColor}`}
        />
        <div className="w-px bg-sg-gray-200 dark:bg-sg-dark-muted flex-grow mt-2" />
      </div>
      {/* Content */}
      <div className="flex-1 pb-8">
        <h3 className="font-display font-bold text-sg-md text-sg-gray-950 dark:text-sg-gray-100 mb-1">
          {props.title}
        </h3>
        <p className="font-body text-sg-base text-sg-gray-600 dark:text-sg-gray-400 leading-relaxed mb-3">
          {props.body}
        </p>
        {props.element && <div>{props.element}</div>}
      </div>
    </div>
  );
};

const ProfileLine = () => {
  const { t } = useLocale();

  const histories = [
    {
      from: "2023-01",
      to: "present",
      org: t.TB,
      link: "https://techtrain.dev",
    },
    {
      from: "2021-04",
      to: "present",
      org: t.TT_MENTOR,
      link: "https://techbowl.co.jp/techtrain/mentors/116",
    },
    {
      from: "2014-04",
      to: "2023-01",
      org: t.SHIM,
      link: null,
    },
    {
      from: "2012-04",
      to: "2014-03",
      org: t.KU,
      link: null,
    },
    {
      from: "2008-04",
      to: "2012-03",
      org: t.KIT_U,
      link: null,
    },
  ];

  return (
    <div className="relative">
      <ProfileContent
        title={t.PROFILE_1_HEAD}
        body={t.PROFILE_1}
        accentColor="bg-sg-blue-400"
        element={
          <div className="relative filter drop-shadow-lg w-4/5 h-32 sm:h-48 sm:w-3/5 rounded-sg-lg overflow-hidden">
            <Image
              alt="country"
              style={{ objectFit: "cover" }}
              fill
              priority
              src="/media/country.jpg"
            />
          </div>
        }
      />
      <ProfileContent
        title={t.PROFILE_2_HEAD}
        body={t.PROFILE_2}
        accentColor="bg-sg-lime-200"
      />
      <ProfileContent
        title={t.PROFILE_3_HEAD}
        body={t.PROFILE_3}
        accentColor="bg-sg-green-400"
        element={
          <div className="relative filter drop-shadow-lg w-4/5 h-48 sm:h-48 sm:w-3/5 rounded-sg-lg overflow-hidden">
            <Image
              alt="sr400"
              style={{ objectFit: "cover" }}
              fill
              priority
              src="/media/bike-and-car.jpg"
            />
          </div>
        }
      />
      <ProfileContent
        title={t.PROFILE_4_HEAD}
        body={t.PROFILE_4}
        accentColor="bg-sg-blue-300"
        element={
          <div className="flex flex-col gap-2">
            {histories.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-sg-md bg-sg-gray-50 dark:bg-sg-dark-subtle border border-sg-gray-200 dark:border-sg-dark-muted"
              >
                <span className="font-body font-semibold text-sg-sm text-sg-gray-700 dark:text-sg-gray-200">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sg-blue-400 dark:hover:text-sg-blue-300 transition-colors duration-200"
                    >
                      {item.org}
                    </a>
                  ) : (
                    item.org
                  )}
                </span>
                <span className="font-display text-sg-xs text-sg-gray-500 dark:text-sg-gray-500 tracking-wide mt-1 sm:mt-0">
                  {item.from} — {item.to}
                </span>
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
};

const Profile = () => {
  return (
    <>
      <Seo pageTitle="Profile" pageDescription="Profile for sugit." />
      {/* Section header */}
      <div className="mb-8">
        <p className="font-display text-sg-xs text-sg-blue-400 tracking-widest uppercase mb-1">
          About me
        </p>
        <h1 className="font-display font-bold text-sg-2xl text-sg-gray-950 dark:text-sg-gray-100 tracking-tight">
          Profile
        </h1>
      </div>
      <ProfileLine />
    </>
  );
};

export default Profile;

Profile.getLayout = function getlayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
