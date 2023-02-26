import Image from "next/image";
import Layout from "../components/layout";
import Seo from "../components/seo";
// MUI
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
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
    <TimelineItem>
      <TimelineOppositeContent
        style={{ flex: 0, marginLeft: -70 }}
      ></TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot className={props.color} />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent style={{ marginRight: -40 }}>
        <span className="text-gray-900 dark:text-gray-100">
          <div className="text-lg font-bold">{props.title}</div>
          <div className="text-md">{props.body}</div>
          <div className="py-4">{props.element ?? <span></span>}</div>
        </span>
      </TimelineContent>
    </TimelineItem>
  );
};

const ProfileLine = () => {
  const { t } = useLocale();
  return (
    <Timeline>
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
              src="/media/sr400.jpg"
            />
          </div>
        }
      />
      <ProfileContent
        title={t.PROFILE_4_HEAD}
        body={t.PROFILE_4}
        color="bg-pink-500"
        element={
          <div className="px-8">
            <table>
              <thead>
                <tr>
                  <td className="p-4">From</td>
                  <td className="p-4">To</td>
                  <td className="p-4">Details</td>
                </tr>
              </thead>
              <tbody>
                <tr className="p-2">
                  <td>2023/1</td>
                  <td>now</td>
                  <td>
                    <a
                      href="https:/techtrain.dev"
                      className="hover:text-blue-500"
                    >
                      TechBowl.Inc
                    </a>
                  </td>
                </tr>
                <tr className="p-2">
                  <td>2021/4</td>
                  <td>now</td>
                  <td>
                    <a
                      href="https://techbowl.co.jp/techtrain/mentors/116"
                      className="hover:text-blue-500"
                    >
                      TechTrain Mentor
                    </a>
                  </td>
                </tr>
                <tr className="p-2">
                  <td>2022/2</td>
                  <td>now</td>
                  <td>
                    <a
                      href="https://kyo-waku.com"
                      className="hover:text-blue-500"
                    >
                      Kyo-waku
                    </a>
                  </td>
                </tr>
                <tr className="p-2">
                  <td>2014/4</td>
                  <td>2023/1</td>
                  <td>
                    Shimadzu Corp. Software Engineer.
                  </td>
                </tr>
                <tr className="p-2">
                  <td>2012/4</td>
                  <td>2014/3</td>
                  <td>
                    Graduate School of Kyoto University, Informatics.
                  </td>
                </tr>
                <tr className="p-2">
                  <td>2008/4</td>
                  <td>2012/3</td>
                  <td>
                  Kyoto Institute of Technology, Informatics Science.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      />
    </Timeline>
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
