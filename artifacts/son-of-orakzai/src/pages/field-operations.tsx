import { useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, Clock, Globe, MapPin } from "lucide-react";

const COLORS = {
  forest: "#031B13",
  emerald: "#06271B",
  gold: "#D6B44C",
  ivory: "#F5F1E7",
} as const;

const PAGE_TITLE = "Orakzai.org Field Operations | Projects & Community Impact";
const PAGE_DESCRIPTION =
  "Explore Orakzai.org field operations, active projects, completed initiatives and community development across six districts and four countries.";
const CANONICAL_URL = "https://orakzai.org/field-operations";

const projects = [
  {
    title: "Clean Water Infrastructure — Orakzai District",
    status: "Ongoing",
    location: "Orakzai, KPK",
    desc: "Installing water purification units and hand pumps across 14 villages to provide safe drinking water.",
  },
  {
    title: "Vocational Training Centre — Hangu",
    status: "Completed",
    location: "Hangu, KPK",
    desc: "Established a fully operational training centre delivering IT, tailoring, and carpentry programs to 200+ youth.",
  },
  {
    title: "Mobile Health Clinic Deployment",
    status: "Ongoing",
    location: "Multiple Districts",
    desc: "Monthly mobile clinic visits covering maternal health, vaccinations, and general medicine for remote communities.",
  },
  {
    title: "Emergency Relief — Flood Response",
    status: "Completed",
    location: "South Orakzai",
    desc: "Distributed food packages, tarpaulins, and emergency cash grants to 480 flood-affected families.",
  },
  {
    title: "School Rehabilitation Programme",
    status: "Ongoing",
    location: "Central Orakzai",
    desc: "Rebuilding 6 government primary schools, furnishing classrooms, and installing solar power units.",
  },
] as const;

const overview = [
  { label: "Active Projects", value: "3", icon: Briefcase },
  { label: "Completed Projects", value: "2", icon: CheckCircle2 },
  { label: "Districts Covered", value: "6", icon: MapPin },
  { label: "Countries Supported From", value: "4", icon: Globe },
] as const;

const ongoingProjects = projects.filter(
  (project) => project.status === "Ongoing",
);
const completedProjects = projects.filter(
  (project) => project.status === "Completed",
);

function useFieldOperationsSeo() {
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

    const schemaId = "field-operations-jsonld";
    const existingSchema = document.getElementById(
      schemaId,
    ) as HTMLScriptElement | null;
    const previousSchemaContent = existingSchema?.textContent ?? null;
    const schema = existingSchema ?? document.createElement("script");
    schema.id = schemaId;
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL_URL}#webpage`,
      url: CANONICAL_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      mainEntity: {
        "@type": "ItemList",
        name: "Active & Completed Projects",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            description: project.desc,
            locationCreated: project.location,
            additionalProperty: {
              "@type": "PropertyValue",
              name: "Project status",
              value: project.status,
            },
          },
        })),
      },
      publisher: {
        "@type": "Organization",
        name: "Orakzai.org",
        url: "https://orakzai.org",
      },
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

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const isOngoing = project.status === "Ongoing";
  const StatusIcon = isOngoing ? Clock : CheckCircle2;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="min-w-0 rounded-xl border p-4 sm:p-5"
      style={{
        backgroundColor: COLORS.forest,
        borderColor: "rgba(214, 180, 76, 0.22)",
      }}
    >
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h4 className="min-w-0 break-words text-base font-semibold leading-snug text-white sm:text-lg">
          {project.title}
        </h4>
        <span
          className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
          style={
            isOngoing
              ? {
                  backgroundColor: "rgba(214, 180, 76, 0.1)",
                  borderColor: "rgba(214, 180, 76, 0.34)",
                  color: COLORS.gold,
                }
              : {
                  backgroundColor: "rgba(245, 241, 231, 0.08)",
                  borderColor: "rgba(245, 241, 231, 0.24)",
                  color: COLORS.ivory,
                }
          }
        >
          <StatusIcon aria-hidden="true" className="h-3.5 w-3.5" />
          {project.status}
        </span>
      </div>
      <p className="mt-3 flex items-center gap-2 text-sm text-white/65">
        <MapPin
          aria-hidden="true"
          className="h-4 w-4 shrink-0"
          style={{ color: COLORS.gold }}
        />
        {project.location}
      </p>
      <p className="mt-2 text-sm leading-6 text-white/75">{project.desc}</p>
    </motion.article>
  );
}

export default function FieldOperations() {
  useFieldOperationsSeo();

  return (
    <MainLayout>
      <section
        aria-labelledby="field-operations-title"
        className="relative overflow-hidden py-16 text-white sm:py-20"
        style={{
          background: `linear-gradient(135deg, ${COLORS.forest} 0%, ${COLORS.emerald} 60%, ${COLORS.forest} 100%)`,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(214,180,76,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${COLORS.gold}88, transparent)`,
          }}
        />
        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em]"
              style={{
                backgroundColor: "rgba(214, 180, 76, 0.1)",
                borderColor: "rgba(214, 180, 76, 0.28)",
                color: COLORS.gold,
              }}
            >
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              Our Impact
            </div>
            <h1
              id="field-operations-title"
              className="mb-5 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Field Operations &amp; Projects
            </h1>
            <p className="mx-auto max-w-3xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              On-the-ground programmes making a direct difference — from water
              infrastructure to emergency relief, education, and healthcare.
            </p>
          </motion.div>
        </div>
      </section>

      <section
        aria-label="Field operations statistics"
        className="border-y py-10 sm:py-14"
        style={{
          backgroundColor: COLORS.emerald,
          borderColor: "rgba(214, 180, 76, 0.22)",
        }}
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {overview.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="flex min-h-36 min-w-0 flex-col items-center justify-center rounded-xl border px-3 py-5 text-center sm:min-h-40 sm:p-6"
                  style={{
                    backgroundColor: COLORS.forest,
                    borderColor: "rgba(214, 180, 76, 0.24)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: "rgba(214, 180, 76, 0.1)",
                      color: COLORS.gold,
                    }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <p
                    className="text-3xl font-semibold leading-none tracking-tight sm:text-4xl"
                    style={{
                      color: COLORS.gold,
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}
                  >
                    {item.value}
                  </p>
                  <p className="mt-2 max-w-full text-xs leading-5 text-white/75 sm:text-sm">
                    {item.label}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="projects-title"
        className="py-12 sm:py-16"
        style={{ backgroundColor: COLORS.forest }}
      >
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <h2
            id="projects-title"
            className="mb-8 text-center text-2xl font-semibold leading-tight text-white sm:mb-10 sm:text-3xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Active &amp; Completed Projects
          </h2>

          <section aria-labelledby="ongoing-projects-title" className="mb-10">
            <h3
              id="ongoing-projects-title"
              className="mb-4 flex items-center gap-2 text-lg font-semibold text-white sm:text-xl"
            >
              <Clock
                aria-hidden="true"
                className="h-5 w-5"
                style={{ color: COLORS.gold }}
              />
              Ongoing Projects
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {ongoingProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="completed-projects-title">
            <h3
              id="completed-projects-title"
              className="mb-4 flex items-center gap-2 text-lg font-semibold text-white sm:text-xl"
            >
              <CheckCircle2
                aria-hidden="true"
                className="h-5 w-5"
                style={{ color: COLORS.ivory }}
              />
              Completed Projects
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {completedProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </section>
        </div>
      </section>
    </MainLayout>
  );
}
