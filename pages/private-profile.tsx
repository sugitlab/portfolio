import Layout from "../components/layout";
import Seo from "../components/seo";

const PrivateProfile = () => {
    return (
      <>
        <Seo pageTitle="Profile" pageDescription="Private Profile for sugit." />
        <div className="p-1">
            このページの情報はURLをお伝えした方に限定して公開しています。このページへのリンクはつけない様にお願いします。
        </div>
      </>
    );
  };
  
  export default PrivateProfile;
  
  PrivateProfile.getLayout = function getlayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
  };
  