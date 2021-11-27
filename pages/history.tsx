import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { useLocale } from "../hooks/locale";
import { seriousballoon_url, yaruhyaku_url } from "../lib/constants";

type HistoryContentProps = {
  title: string;
  body: string;
  color: string;
  element?: React.ReactElement;
};
const HistoryContent = (props: HistoryContentProps) => {
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

const HistoryLine = () => {
  const { t } = useLocale();
  return (
    <Timeline>
      <HistoryContent
        title={t.PROFILE_1_HEAD}
        body={t.PROFILE_1}
        color="bg-indigo-500"
        element={
          <div className="relative filter drop-shadow-lg w-4/5 h-32 sm:h-48 sm:w-3/5 rounded-lg overflow-hidden">
            <Image
              alt="country"
              objectFit="cover"
              layout="fill"
              priority
              src="/media/country.jpg"
            />
          </div>
        }
      />
      <HistoryContent
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
      <HistoryContent
        title={t.PROFILE_3_HEAD}
        body={t.PROFILE_3}
        color="bg-green-500"
        element={
          <div className="relative filter drop-shadow-lg w-4/5 h-48 sm:h-48 sm:w-3/5 rounded-lg overflow-hidden">
            <Image
              alt="sr400"
              objectFit="cover"
              layout="fill"
              priority
              src="/media/sr400.jpg"
            />
          </div>
        }
      />
    </Timeline>
  );
};

const History: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="p-1">
        <HistoryLine />
      </div>
    </>
  );
};

export default History;
