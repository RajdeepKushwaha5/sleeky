"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

const VID_KEY = "sleeky_vid";

/** Module-level set so each slug only POSTs once per page session. */
const postedSlugs = new Set<string>();

function getVisitorId(): string | null {
  try {
    return localStorage.getItem(VID_KEY);
  } catch {
    return null;
  }
}

export function PostViewCount({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const visitorId = getVisitorId();

    // If we already POSTed for this slug this session, or have no visitor ID, just GET.
    if (postedSlugs.has(slug) || !visitorId) {
      fetch(`/api/blog/${slug}/views`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.views != null) setViews(data.views);
        })
        .catch(() => {});
      return;
    }
    postedSlugs.add(slug);

    fetch(`/api/blog/${slug}/views`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.views != null) setViews(data.views);
      })
      .catch(() => {});
  }, [slug]);

  if (views == null) return null;

  return (
    <div className="flex items-center gap-1 whitespace-nowrap">
      <Eye className="size-3" aria-hidden="true" />
      <span>{views.toLocaleString()} views</span>
    </div>
  );
}

export function PostViewCountReadOnly({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/blog/${slug}/views`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setViews(data.views);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (views == null) return null;

  return (
    <div className="flex items-center gap-1 whitespace-nowrap">
      <Eye className="size-3" aria-hidden="true" />
      <span>{views.toLocaleString()} views</span>
    </div>
  );
}
