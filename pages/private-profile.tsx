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
                <h1 className="font-display text-sg-3xl font-bold text-center mb-4 text-sg-gray-950 dark:text-sg-gray-100">🔐 プロフィールページ</h1>
                <div className="text-center text-sg-gray-500 dark:text-sg-gray-300 mb-6">
                    <p className="text-sm">※ ちゃんとしたプロフィール情報をお渡しするときのページです。<br />
                        リンクは貼らず、そっとしておいてください 🌱</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-white/75 dark:bg-sg-dark-surface/80 border border-white/80 dark:border-white/10 rounded-sg-lg p-6 shadow-sg-md backdrop-blur-sm">
                    <Image
                        src="/media/photo.jpg"
                        alt="Profile"
                        className="rounded-full w-48 h-48 mb-4 ring-4 ring-sg-green-100 dark:ring-sg-dark-subtle"
                        width={512}
                        height={512}
                        priority
                    />
                    <h1 className="font-display text-2xl font-bold text-sg-gray-950 dark:text-sg-gray-100">杉本真二 (すぎもとしんじ)</h1>
                    <div className="m-4">
                        <h2 className="font-display text-lg font-semibold text-sg-green-600 dark:text-sg-green-300">フォーマルな自己紹介</h2>
                        <p className="text-sg-gray-600 dark:text-sg-gray-300 leading-relaxed">京都大学大学院を卒業後、株式会社島津製作所でソフトウェアを中心とした研究開発業務に従事。海外開発拠点との共同開発プロジェクトを中心に担当。2年目からマネジメントを兼任するようになり、プロジェクトマネジメント・プロダクトマネジメントの経験が豊富。ソフトウェアエンジニアとしては C#、TypeScript (Node.js, React) 、Dart (Flutter) が好きで、2021年より TechTrain のメンターにJoin。その後、2023年にTechBowlのプロダクトマネージャーとして参画。同年執行役員CPOに就任し、2024年12月 取締役COO/CPOに就任。</p>
                    </div>
                    <div className="m-4">
                        <h2 className="font-display text-lg font-semibold text-sg-green-600 dark:text-sg-green-300">カジュアルな自己紹介</h2>
                        <p className="text-sg-gray-600 dark:text-sg-gray-300 leading-relaxed">ライフサイエンス系の研究開発職からキャリアをスタート。オフショアとの共同開発を中心にエンジニアとPMを8年間兼任。2023年にエンジニア向け教育・キャリア支援事業を行うTechBowlにPMとしてJOINし、現在は嬉々としてPullRequestを投げたがるCOO兼CPOとして奔走中。</p>
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
