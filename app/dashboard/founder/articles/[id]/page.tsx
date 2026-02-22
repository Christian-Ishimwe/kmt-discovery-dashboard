"use client";

import { useParams } from "next/navigation";
import { useArticle } from "@/hooks/use-article";
import { Loader2, ArrowLeft, Edit, Calendar, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArticleContentRenderer } from "@/components/article-content-renderer";

export default function ArticleDetailsPage() {
  const params = useParams<{ id: string }>();
  const { article, loading, error } = useArticle(params.id);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="text-destructive p-4">
        Error: {error || "Article not found"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/founder/articles">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Article Details
            </h1>
            <p className="text-muted-foreground">
              View article details and status.
            </p>
          </div>
        </div>
        <Link href={`/dashboard/founder/articles/${params.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Article
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {article.excerpt && (
                <div className="text-lg text-muted-foreground border-l-4 pl-4 italic">
                  {article.excerpt}
                </div>
              )}
              <ArticleContentRenderer content={article.content} />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status & Meta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Status
                </span>
                <div className="mt-1">
                  <Badge
                    variant={
                      article.status === "PUBLISHED" ? "default" : "secondary"
                    }
                  >
                    {article.status}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Access Level
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span>{article.accessLevel}</span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Created At
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {format(new Date(article.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Slug
                </span>
                <div className="mt-1 flex items-center gap-2 font-mono text-sm bg-muted p-1 rounded break-all">
                  <Globe className="h-3 w-3" />
                  {article.slug}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
