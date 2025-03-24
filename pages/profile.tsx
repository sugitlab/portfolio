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
    <div className="relative pl-4">
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
        element={
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <div className="static filter drop-shadow-lg rounded-xl w-20 h-20 overflow-hidden">
                <a href={yaruhyaku_url}>
                  <Image
                    alt="yaruhyaku"
                    height={100}
                    width={100}
                    src="/media/yaruhyaku.png"
                  />
                </a>
              </div>
              <p className="text-md font-bold"> {t.YARUHYAKU} </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <a href={seriousballoon_url}>
                <div className="static filter drop-shadow-lg rounded-xl w-20 h-20 overflow-hidden">
                  <Image
                    alt="seriousballoon"
                    height={100}
                    width={100}
                    src="/media/seriousballoon.png"
                  />
                </div>
              </a>
              <p className="text-md font-bold"> {t.SIRIBAL} </p>
            </div>
          </div>
        }
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
            <table className="items-center w-full border-collapse text-blueGray-700">
              <thead className="thead-light">
                <tr>
                  <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    From
                  </td>
                  <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    To
                  </td>
                  <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Organization
                  </td>
                </tr>
              </thead>
              <tbody>
                {
                  histories.map((item, index) => (
                    <tr key={index}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                        {item.from}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                        {item.to}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md p-4">
                        {item.link ? (
                          <a href={item.link} className="hover:text-blue-500">
                            {item.org}
                          </a>
                        ) : (
                          item.org
                        )}

                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
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
