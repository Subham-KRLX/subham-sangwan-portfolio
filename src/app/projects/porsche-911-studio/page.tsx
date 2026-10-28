import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

const repository = "https://github.com/Subham-KRLX/Porsche-premium-car-experience";
const source = `${repository}/blob/eb99d8b20cf2e33f394200df05ed288d1e665755`;

export const metadata: Metadata = {
  title: "Porsche 911 Studio Case Study",
  description: "Building a frontend configuration flow with a vehicle preview, a clear summary and browser-local saved builds.",
  alternates: { canonical: "/projects/porsche-911-studio" },
  openGraph: {
    title: "Porsche 911 Studio | Subham Sangwan",
    description: "The configuration workflow, storage decisions and image limitations behind my 911 Studio project.",
    url: "/projects/porsche-911-studio",
  },
  twitter: {
    title: "Porsche 911 Studio | Subham Sangwan",
    description: "A frontend case study: choose a configuration, review it and save it to My Garage.",
  },
};

export default function PorscheCaseStudy() {
  return (
    <div className="min-h-screen bg-background text-[#1a1a1a]">
      <a href="#case-study" className="skip-link">Skip to case study</a>
      <header className="border-b border-[#e5e0d8]">
        <nav aria-label="Case study navigation" className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-6">
          <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold hover:underline">
            <ArrowLeft size={18} aria-hidden="true" /> Back to projects
          </Link>
          <Link href="/" aria-label="Subham Sangwan home" className="text-2xl font-bold">SS.</Link>
        </nav>
      </header>

      <main id="case-study" tabIndex={-1} className="mx-auto max-w-5xl px-6 pb-16">
        <article>
          <header className="py-12 sm:py-16">
            <p className="font-mono text-xs uppercase text-[#6b6b6b]">Project notes / Frontend</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Porsche 911 Studio</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#4a4a4a]">
              The Porsche project started as a vehicle showcase. I added 911 Studio to give
              visitors something to do beyond browsing: choose a configuration, review the
              details and keep a build in My Garage.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
              <a href="https://porsche-premium-car-experience-three.vercel.app/studio" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4">
                Open 911 Studio <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href={repository} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4">
                <Github size={16} aria-hidden="true" /> Source code
              </a>
            </div>
            <p className="mt-4 font-mono text-xs leading-relaxed text-[#6b6b6b]">Next.js / React / TypeScript / CSS / localStorage</p>
          </header>

          <figure>
            <Image src="/case-studies/porsche-studio.png" alt="911 Studio showing a white Carrera GTS exterior preview beside paint choices and an illustrative configuration total" width={1440} height={1000} sizes="(min-width: 1024px) 976px, 100vw" />
            <figcaption className="mt-3 text-sm text-[#6b6b6b]">The live Studio, captured on 28 October 2026. Independent concept, not an official Porsche service.</figcaption>
          </figure>

          <div className="mt-12 max-w-3xl space-y-12 text-base leading-relaxed text-[#4a4a4a] [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#1a1a1a] [&_p+p]:mt-4 [&_a]:underline [&_a]:underline-offset-4">
            <section aria-labelledby="the-workflow">
              <h2 id="the-workflow">One complete flow</h2>
              <p>
                I kept the scope to one model, the 911 Carrera GTS. There are four paint
                choices, two wheel options and three interior trim concepts. Paint and wheels
                change the exterior reference image. Interior choices are recorded in the
                summary; they do not produce a cabin preview.
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-6">
                <li>Choose paint, wheels and trim without losing earlier selections.</li>
                <li>Review the selected options and the itemized concept price.</li>
                <li>Name the build and save it to My Garage.</li>
                <li>Return to the garage to reopen, rename or delete a saved build.</li>
              </ol>
              <p className="mt-4">
                That gave the project a useful beginning and end. A set of colour swatches
                alone would not have shown how the choices carry through the rest of the experience.
              </p>
            </section>

            <section aria-labelledby="implementation">
              <h2 id="implementation">Keeping the pieces separate</h2>
              <p>
                The configurator owns the current selections and step. A separate preview
                component maps paint, wheels and camera view to an image. The garage handles
                saved builds, while the shared TypeScript module holds option definitions,
                validation and price calculation.
              </p>
              <p>
                The total comes from those option definitions rather than separate amounts
                inside each screen. When a saved build is reopened, the same selection data
                drives both the preview and the summary.
              </p>
            </section>

            <section aria-labelledby="local-saves">
              <h2 id="local-saves">Why the garage stays in the browser</h2>
              <p>
                This feature is a frontend demonstration, so saving a build does not require
                an account or a backend request. My Garage uses versioned localStorage and
                allows up to 12 builds. Clearing browser data removes them, and they do not
                sync to another device.
              </p>
              <p>
                Stored JSON is still untrusted input. Before using it, the code checks the
                version, option IDs, names, timestamps and duplicate build IDs. If the data
                cannot be read, it reports the problem instead of silently replacing it.
                Resetting invalid garage data requires confirmation.
              </p>
              <p>
                A save is only reported as successful after the storage write succeeds.
                Blocked or full storage gets an error message. The garage also listens for
                storage changes from other tabs, although this is not a transactional,
                multi-user storage system.
              </p>
            </section>

            <section aria-labelledby="images-and-layout">
              <h2 id="images-and-layout">The preview is also a dependency</h2>
              <p>
                There are three exterior camera views. The images come from
                <code className="font-mono text-sm"> prs.porsche.com</code>, not a 3D scene
                running in the browser. That keeps this implementation small, but the image
                service is outside my control and has been intermittent during checks.
              </p>
              <p>
                The preview has loading, failure and retry states. If an image fails, the
                configuration stays intact. On smaller screens, the layout stacks the preview
                and controls and keeps the total and next action in a mobile price bar.
              </p>
              <p>
                The screenshot shows a successful image load, not a guarantee that every
                image will always be available. A next step would be to arrange properly
                licensed, self-hosted renders rather than depend on the external service.
              </p>
            </section>

            <section aria-labelledby="checks">
              <h2 id="checks">What I checked</h2>
              <p>
                The Studio logic tests cover every valid option combination and its total,
                saving and reopening, updates without duplicates, deletion and the garage
                limit. They also cover malformed saved data, invalid choices and failed storage writes.
              </p>
              <p>
                For this case study, I reran the 18 Studio tests and checked the live
                save-to-garage flow in an isolated browser. I also captured the Studio shown
                above from the running site. Those checks are useful, but they do not remove
                the dependency on the external images.
              </p>
            </section>

            <section aria-labelledby="boundaries">
              <h2 id="boundaries">What it does not do</h2>
              <p>
                All prices are illustrative USD amounts. They are not dealer quotes or
                verified option availability. Studio does not place an order, take a payment,
                render a 3D vehicle or save a build to a customer account.
              </p>
              <p>
                Before adding more models, I would improve image reliability and test more
                of the configuration and garage flow automatically in a browser. I would
                keep the next change focused on making this workflow dependable.
              </p>
            </section>

            <section aria-labelledby="source-notes" className="border-t border-[#e5e0d8] pt-8 text-sm">
              <h2 id="source-notes">Code behind the decisions</h2>
              <p>This write-up refers to revision <code className="font-mono">eb99d8b</code> of the project.</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li><a href={`${source}/src/components/studio/StudioConfigurator.tsx`}>Configuration steps and save flow</a></li>
                <li><a href={`${source}/src/components/studio/StudioGarage.tsx`}>Garage and recovery states</a></li>
                <li><a href={`${source}/src/lib/studio.ts`}>Options, price calculation and storage validation</a></li>
                <li><a href={`${source}/src/components/studio/StudioPreview.tsx`}>Image loading and retry handling</a></li>
                <li><a href={`${source}/tests/studio.test.cjs`}>Studio regression tests</a></li>
              </ul>
            </section>
          </div>
        </article>
      </main>
      <footer className="border-t border-[#e5e0d8] px-6 py-8">
        <div className="mx-auto max-w-5xl text-sm">
          <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 font-bold hover:underline"><ArrowLeft size={16} aria-hidden="true" /> Back to projects</Link>
        </div>
      </footer>
    </div>
  );
}
