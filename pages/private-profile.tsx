import Layout from "../components/layout";
import Image from "next/image";
import Seo from "../components/seo";
import WorkHistoryTimeline from "../components/work_history_timeline";
import { getWorkHistory } from "../lib/work-history";

const PrivateProfile = () => {
    const workHistory = getWorkHistory();
    return (
        <>
            <Seo 
                pageTitle="Profile" 
                pageDescription="Private Profile for sugit." 
                noIndex={true} 
            />
            <div className="p-1">
                <h1 className="text-3xl font-bold text-center mb-4">🔐 プロフィールページ</h1>
                <div className="text-center text-gray-500 mb-4">
                    <p className="text-sm">※ ちゃんとしたプロフィール情報をお渡しするときのページです。<br />
                        リンクは貼らず、そっとしておいてください 🌱</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <Image
                        src="/media/photo.jpg"
                        alt="Profile"
                        className="rounded-full w-48 h-48 mb-4"
                        width={512}
                        height={512}
                        priority
                    />
                    <h1 className="text-2xl font-bold">杉本真二 (すぎもとしんじ)</h1>
                    <div className="m-4">
                        <h2 className="text-lg font-semibold">フォーマルな自己紹介</h2>
                        <p className="text-gray-600">京都大学大学院を卒業後、株式会社島津製作所でソフトウェアを中心とした研究開発業務に従事。海外開発拠点との共同開発プロジェクトを中心に担当。2年目からマネジメントを兼任するようになり、プロジェクトマネジメント・プロダクトマネジメントの経験が豊富。ソフトウェアエンジニアとしては C#、TypeScript (Node.js, React) 、Dart (Flutter) が好きで、2021年より TechTrain のメンターにJoin。その後、2023年にTechBowlのプロダクトマネージャーとして参画。同年執行役員CPOに就任し、2024年12月 取締役COO/CPOに就任。</p>
                    </div>
                    <div className="m-4">
                        <h2 className="text-lg font-semibold">カジュアルな自己紹介</h2>
                        <p className="text-gray-600">ライフサイエンス系の研究開発職からキャリアをスタート。オフショアとの共同開発を中心にエンジニアとPMを8年間兼任。2023年にエンジニア向け教育・キャリア支援事業を行うTechBowlにPMとしてJOINし、現在は嬉々としてPullRequestを投げたがるCOO兼CPOとして奔走中。</p>
                    </div>
                </div>
                <WorkHistoryTimeline entries={workHistory} />
            </div>
        </>
    );
};

export default PrivateProfile;

PrivateProfile.getLayout = function getlayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};
