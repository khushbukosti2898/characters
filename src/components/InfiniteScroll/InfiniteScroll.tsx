import React, { useEffect } from 'react';

interface InfiniteScrollProps {
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading: boolean;
  children: React.ReactNode;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  hasMore,
  onLoadMore,
  isLoading,
  children,
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (hasMore && nearBottom && !isLoading) {
        onLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, onLoadMore, isLoading]);

  return <>{children}</>;
};
