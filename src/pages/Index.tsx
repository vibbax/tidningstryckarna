import PageLayout from "@/components/PageLayout";
import BlockRenderer from "@/components/blocks/BlockRenderer";

const Index = () => {
  return (
    <PageLayout>
      <BlockRenderer pageSlug="home" />
    </PageLayout>
  );
};

export default Index;
