import { useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import BlockRenderer from "@/components/blocks/BlockRenderer";

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <PageLayout>
      <BlockRenderer pageSlug={slug || "home"} />
    </PageLayout>
  );
};

export default DynamicPage;
