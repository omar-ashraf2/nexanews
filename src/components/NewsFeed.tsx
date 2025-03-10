/**
 * NewsFeed.tsx
 *
 * Shows either loading skeletons, an error, no results, or the article list.
 */
import { ArticleList, ArticleSkeleton } from "@/components";
import { EmptyScreen } from "@/components/common";
import { Article } from "@/types/Article";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { memo } from "react";

interface NewsFeedProps {
  articles: Article[];
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

const NewsFeed = memo<NewsFeedProps>(({ articles, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }, (_, idx) => (
          <ArticleSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (error) {
    return <EmptyScreen message="An error occurred while fetching articles." />;
  }

  if (articles.length === 0) {
    return <EmptyScreen message="No articles found." />;
  }

  return <ArticleList articles={articles} />;
});

NewsFeed.displayName = "NewsFeed";
export default NewsFeed;
