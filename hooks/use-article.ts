import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Article } from "@/types/article";
import { articleApi } from "@/lib/api-article";

export function useArticle(id: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  // @ts-ignore
  const accessToken = session?.accessToken;

  const fetchArticle = async () => {
    if (!accessToken || !id) return;

    setLoading(true);
    setError(null);

    try {
      // @ts-ignore
      const data = await articleApi.getArticle(id, accessToken);
      console.log("Single Article API Response:", data);
      
      let fetchedArticle: any = data;
      
      if (data && typeof data === 'object') {
          // Check if data is wrapped in a 'data' property
          // @ts-ignore
          if ('data' in data) {
              // @ts-ignore
              const innerData = data.data;
              if (innerData && typeof innerData === 'object' && 'article' in innerData) {
                  fetchedArticle = innerData.article;
              } else {
                  fetchedArticle = innerData;
              }
          } 
          // Check if 'article' is a direct property
          // @ts-ignore
          else if ('article' in data) {
              // @ts-ignore
              fetchedArticle = data.article;
          }
      }
      
      setArticle(fetchedArticle as Article);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch article');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken && id) {
      fetchArticle();
    }
  }, [accessToken, id]);

  return { article, loading, error, refetch: fetchArticle };
}
