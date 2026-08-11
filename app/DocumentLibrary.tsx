"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  coreSenseDocuments,
  getCoreSenseDocument,
} from "./docs-manifest";

type DocumentLibraryProps = {
  selectedPath: string | null;
  onSelect: (path: string) => void;
  onClose: () => void;
};

function resolveMarkdownPath(currentPath: string, href?: string) {
  if (!href || !href.toLowerCase().includes(".md")) return null;

  const filePath = href.split("#")[0].split("?")[0];
  if (/^https?:\/\//i.test(filePath)) return null;

  const baseSegments = currentPath.split("/").slice(0, -1);
  const pathSegments = filePath.replace(/^\.\//, "").split("/");
  const resolved = filePath.startsWith("/") ? [] : baseSegments;

  for (const segment of pathSegments) {
    if (!segment || segment === ".") continue;
    if (segment === "..") resolved.pop();
    else resolved.push(segment);
  }

  return resolved.join("/");
}

export function DocumentLibrary({
  selectedPath,
  onSelect,
  onClose,
}: DocumentLibraryProps) {
  const [loadedDocument, setLoadedDocument] = useState({
    path: "",
    source: "",
    error: "",
  });
  const [query, setQuery] = useState("");
  const closeViewer = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!selectedPath) return;

    const controller = new AbortController();

    fetch(`/docs/${selectedPath}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Document returned ${response.status}`);
        return response.text();
      })
      .then((source) => {
        setLoadedDocument({ path: selectedPath, source, error: "" });
      })
      .catch((fetchError: unknown) => {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }
        setLoadedDocument({
          path: selectedPath,
          source: "",
          error: "This document could not be loaded.",
        });
      });

    return () => controller.abort();
  }, [selectedPath]);

  useEffect(() => {
    if (!selectedPath) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeViewer, selectedPath]);

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return coreSenseDocuments;
    return coreSenseDocuments.filter((document) =>
      `${document.title} ${document.category} ${document.path}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  if (!selectedPath) return null;

  const selectedDocument = getCoreSenseDocument(selectedPath);
  const source = loadedDocument.path === selectedPath ? loadedDocument.source : "";
  const error = loadedDocument.path === selectedPath ? loadedDocument.error : "";

  return (
    <div className="document-viewer" role="dialog" aria-modal="true" aria-labelledby="document-viewer-title">
      <div className="document-viewer-bar">
        <div>
          <span>CoreSense documentation</span>
          <h2 id="document-viewer-title">
            {selectedDocument?.title ?? selectedPath}
          </h2>
        </div>
        <button
          className="document-close"
          type="button"
          aria-label="Close document viewer"
          onClick={closeViewer}
        >
          <span aria-hidden />
        </button>
      </div>

      <div className="document-mobile-select">
        <label htmlFor="document-select">Choose a project document</label>
        <select
          id="document-select"
          value={selectedPath}
          onChange={(event) => onSelect(event.target.value)}
        >
          {coreSenseDocuments.map((document) => (
            <option key={document.path} value={document.path}>
              {document.category}: {document.title}
            </option>
          ))}
        </select>
      </div>

      <div className="document-viewer-layout">
        <aside className="document-index" aria-label="CoreSense documents">
          <label htmlFor="document-search">Search 31 documents</label>
          <input
            id="document-search"
            type="search"
            value={query}
            placeholder="Search documents"
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="document-index-list">
            {filteredDocuments.map((document) => (
              <button
                className={document.path === selectedPath ? "active" : ""}
                key={document.path}
                type="button"
                onClick={() => onSelect(document.path)}
              >
                <span>{document.category}</span>
                {document.title}
              </button>
            ))}
          </div>
        </aside>

        <article className="document-content">
          {error && <p className="document-error">{error}</p>}
          {!error && !source && <p className="document-loading">Loading document...</p>}
          {source && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => {
                  const internalPath = resolveMarkdownPath(selectedPath, href);
                  const internalDocument = internalPath
                    ? getCoreSenseDocument(internalPath)
                    : undefined;

                  if (internalDocument) {
                    return (
                      <button
                        className="document-inline-link"
                        type="button"
                        onClick={() => onSelect(internalDocument.path)}
                      >
                        {children}
                      </button>
                    );
                  }

                  if (href && /^https?:\/\//i.test(href)) {
                    return (
                      <a href={href} target="_blank" rel="noreferrer">
                        {children}
                      </a>
                    );
                  }

                  return <span className="document-reference">{children}</span>;
                },
              }}
            >
              {source}
            </ReactMarkdown>
          )}
        </article>
      </div>
    </div>
  );
}
