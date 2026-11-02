import { useEffect } from "react";
import {
  BarChart3,
  Download,
  FileText,
  FolderKanban,
  Users,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";

const COLORS = {
  forest: "#031B13",
  emerald: "#06271B",
  gold: "#D6B44C",
  ivory: "#F5F1E7",
} as const;

const PAGE_TITLE = "Orakzai.org Impact Reports | Annual Impact Report 2025";
const PAGE_DESCRIPTION =
  "Explore Orakzai.org's annual impact reporting, organizational metrics, programme outcomes and 2025 financial transparency report.";
const CANONICAL_URL = "https://orakzai.org/impact-reports";
const REPORT_URL = "/Orakzai_Annual_Impact_Report_2025.pdf";
const REPORT_DESCRIPTION =
  "Detailed financial, organizational and programme impact review for January–December 2025.";

const statistics = [
  { value: "28,850+", label: "Total Members", icon: Users },
  { value: "3", label: "Projects Running", icon: FolderKanban },
  { value: "2025", label: "Annual Impact Report", icon: FileText },
];

function useImpactReportsSeo() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaSnapshots = new Map<
      string,
      { element: HTMLMetaElement; existed: boolean; content: string | null }
    >();

    const setMeta = (key: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      const selector = `meta[${attribute}="${key}"]`;
      let element = document.head.querySelector(
        selector,
      ) as HTMLMetaElement | null;
      const existed = element !== null;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      if (!metaSnapshots.has(selector)) {
        metaSnapshots.set(selector, {
          element,
          existed,
          content: element.getAttribute("content"),
        });
      }
      element.setAttribute("content", content);
    };

    const previousCanonical = document.head.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    const canonical = previousCanonical ?? document.createElement("link");
    if (!previousCanonical) {
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    const previousCanonicalHref = canonical.getAttribute("href");
    canonical.setAttribute("href", CANONICAL_URL);

    document.title = PAGE_TITLE;
    setMeta("description", PAGE_DESCRIPTION);
    setMeta("og:type", "website", true);
    setMeta("og:url", CANONICAL_URL, true);
    setMeta("og:title", PAGE_TITLE, true);
    setMeta("og:description", PAGE_DESCRIPTION, true);
    setMeta("og:image", "https://orakzai.org/orakzai-org-logo.png", true);
    setMeta("og:site_name", "Orakzai.org", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:url", CANONICAL_URL);
    setMeta("twitter:title", PAGE_TITLE);
    setMeta("twitter:description", PAGE_DESCRIPTION);
    setMeta("twitter:image", "https://orakzai.org/orakzai-org-logo.png");

    const existingSchema = document.getElementById(
      "impact-reports-jsonld",
    ) as HTMLScriptElement | null;
    const previousSchemaContent = existingSchema?.textContent ?? null;
    const schema = existingSchema ?? document.createElement("script");
    schema.id = "impact-reports-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${CANONICAL_URL}#webpage`,
          url: CANONICAL_URL,
          name: PAGE_TITLE,
          description: PAGE_DESCRIPTION,
          mainEntity: { "@id": `${CANONICAL_URL}#report-2025` },
        },
        {
          "@type": "Report",
          "@id": `${CANONICAL_URL}#report-2025`,
          name: "Annual Impact Report 2025",
          description: REPORT_DESCRIPTION,
          url: `https://orakzai.org${REPORT_URL}`,
          inLanguage: "en",
          publisher: {
            "@type": "Organization",
            name: "Orakzai.org",
            url: "https://orakzai.org",
          },
        },
      ],
    });
    if (!existingSchema) document.head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      for (const [selector, snapshot] of metaSnapshots) {
        if (snapshot.existed) {
          if (snapshot.content === null)
            snapshot.element.removeAttribute("content");
          else snapshot.element.setAttribute("content", snapshot.content);
        } else {
          snapshot.element.remove();
        }
      }

      if (previousCanonical) {
        if (previousCanonicalHref === null)
          previousCanonical.removeAttribute("href");
        else previousCanonical.setAttribute("href", previousCanonicalHref);
      } else {
        canonical.remove();
      }

      if (existingSchema) existingSchema.textContent = previousSchemaContent;
      else schema.remove();
    };
  }, []);
}

export default function ImpactReports() {
  useImpactReportsSeo();

  return (
    <MainLayout>
      <div style={{ backgroundColor: COLORS.forest }}>
        <section
          aria-labelledby="impact-page-title"
          className="border-b"
          style={{
            backgroundColor: COLORS.forest,
            borderColor: "rgba(214, 180, 76, 0.28)",
            color: COLORS.ivory,
          }}
        >
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <p
                className="text-xs font-semibold uppercase tracking-[0.24em]"
                style={{ color: COLORS.gold }}
              >
                Impact &amp; transparency
              </p>
              <h1
                id="impact-page-title"
                className="mt-5 text-[2.45rem] font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.5rem]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Impact Reports &amp; Metrics
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                Transparent, data-driven reporting on how your trust and support
                translates into measurable change for the Orakzai community.
              </p>
              <div
                aria-hidden="true"
                className="mx-auto mt-9 h-px w-16"
                style={{ backgroundColor: COLORS.gold }}
              />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="impact-statistics-title"
          className="border-b"
          style={{
            backgroundColor: COLORS.emerald,
            borderColor: "rgba(214, 180, 76, 0.2)",
          }}
        >
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
            <div className="mb-8 text-center sm:mb-10">
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: COLORS.gold }}
              >
                At a glance
              </p>
              <h2
                id="impact-statistics-title"
                className="mt-3 text-2xl font-semibold sm:text-3xl"
                style={{
                  color: COLORS.ivory,
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                Community impact
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {statistics.map(({ value, label, icon: Icon }) => (
                <article
                  key={label}
                  className="flex min-h-40 flex-col items-center justify-center rounded-xl border px-5 py-7 text-center sm:min-h-48 sm:px-6"
                  style={{
                    backgroundColor: COLORS.forest,
                    borderColor: "rgba(214, 180, 76, 0.3)",
                  }}
                >
                  <span
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border"
                    style={{
                      borderColor: "rgba(214, 180, 76, 0.55)",
                      color: COLORS.gold,
                    }}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.6}
                    />
                  </span>
                  <p
                    className="text-3xl font-semibold leading-none tracking-tight sm:text-[2.1rem]"
                    style={{
                      color: COLORS.gold,
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}
                  >
                    {value}
                  </p>
                  <p className="mt-3 text-sm leading-5 text-white/75">
                    {label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="annual-report-title"
          style={{ backgroundColor: COLORS.emerald, color: COLORS.ivory }}
        >
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-4xl">
              <div
                className="mb-8 border-b pb-6 sm:mb-10"
                style={{ borderColor: "rgba(214, 180, 76, 0.28)" }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: COLORS.gold }}
                >
                  Reporting &amp; accountability
                </p>
                <h2
                  id="annual-report-title"
                  className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Annual Impact Report
                </h2>
              </div>

              <article
                className="flex flex-col gap-6 rounded-xl border p-5 sm:p-7 md:flex-row md:items-center md:justify-between md:gap-8"
                style={{
                  backgroundColor: COLORS.forest,
                  borderColor: "rgba(214, 180, 76, 0.3)",
                  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.16)",
                }}
              >
                <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: COLORS.emerald,
                      color: COLORS.gold,
                    }}
                  >
                    <BarChart3 className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0">
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.16em]"
                      style={{ color: COLORS.gold }}
                    >
                      January–December 2025
                    </p>
                    <h3
                      className="mt-2 text-xl font-semibold leading-snug sm:text-2xl"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      Annual Impact Report 2025
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                      {REPORT_DESCRIPTION}
                    </p>
                  </div>
                </div>

                <a
                  href={REPORT_URL}
                  download="Orakzai_Annual_Impact_Report_2025.pdf"
                  className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors hover:bg-[#C6A33F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#031B13] md:w-auto"
                  style={{ backgroundColor: COLORS.gold, color: COLORS.forest }}
                  aria-label="Download Annual Impact Report 2025 as a PDF"
                >
                  <Download
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                  Download PDF
                </a>
              </article>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
