import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { useLocale } from "../hooks/locale";
import { seriousballoon_url, yaruhyaku_url } from "../lib/constants";

type ProfileContentProps = {
  title: string;
  body: string;
  color: string;
  element?: React.ReactElement;
};



const ProfileContent = (props: ProfileContentProps) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center mr-4">
        <div className={`w-4 h-4 rounded-full ${props.color}`}></div>
        <div className="w-0.5 bg-gray-300 dark:bg-gray-600 flex-grow"></div>
      </div>
      <div className="flex-1">
        <span className="text-gray-900 dark:text-gray-100">
          <div className="text-lg font-bold">{props.title}</div>
          <div className="text-md">{props.body}</div>
          <div className="py-4">{props.element ?? <span></span>}</div>
        </span>
      </div>
    </div>
  );
};

const ProfileLine = () => {
  const { t } = useLocale();

  const histories =
    [
      {
        from: "2023-01",
        to: "present",
        org: t.TB,
        link: "https://techtrain.dev"
      },
      {
        from: "2021-04",
        to: "present",
        org: t.TT_MENTOR,
        link: "https://techbowl.co.jp/techtrain/mentors/116"
      },
      {
        from: "2014-04",
        to: "2023-01",
        org: t.SHIM,
        link: null
      },
      {
        from: "2012-04",
        to: "2014-03",
        org: t.KU,
        link: null
      },
      {
        from: "2008-04",
        to: "2012-03",
        org: t.KIT_U,
        link: null
      }
    ];

  return (
    <div className="relative pl-2">
      <ProfileContent
        title={t.PROFILE_1_HEAD}
        body={t.PROFILE_1}
        color="bg-indigo-500"
        element={
          <div className="relative filter drop-shadow-lg w-4/5 h-32 sm:h-48 sm:w-3/5 rounded-lg overflow-hidden">
            <Image
              alt="country"
              style={{
                objectFit: "cover",
              }}
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
        color="bg-yellow-500"
      />
      <ProfileContent
        title={t.PROFILE_3_HEAD}
        body={t.PROFILE_3}
        color="bg-green-500"
        element={
          <div className="relative filter drop-shadow-lg w-4/5 h-48 sm:h-48 sm:w-3/5 rounded-lg overflow-hidden">
            <Image
              alt="sr400"
              style={{
                objectFit: "cover",
              }}
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
        color="bg-pink-500"
        element={
          <div className="px-2">
          <div className="px-2">
            <div className="flex flex-col space-y-4">
              {histories.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">
                          {item.org}
                        </a>
                      ) : (
                        item.org
                      )}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                    {item.from} - {item.to}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
      <div className="p-1">
        <ProfileLine />
      </div>
    </>
  );
};

export default Profile;

Profile.getLayout = function getlayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
