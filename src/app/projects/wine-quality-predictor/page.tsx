import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import evaluation from "../../../data/wine-evaluation.json";

const repository = "https://github.com/Subham-KRLX/Wine-quality-predictor-";
const source = `${repository}/blob/2c45b157821bf861d06631da1392e1fa59eb1f45`;
const commonRatings = evaluation.rating_counts["5"] + evaluation.rating_counts["6"];

export const metadata: Metadata = {
  title: "Wine Quality Predictor Case Study",
  description: "How I connected a React interface to a FastAPI wine prediction service, checked the model, and worked through its limitations.",
  alternates: { canonical: "/projects/wine-quality-predictor" },
  openGraph: {
    title: "Wine Quality Predictor | Subham Sangwan",
    description: "A project walkthrough covering the prediction flow, validation and an honest look at model evaluation.",
    url: "/projects/wine-quality-predictor",
  },
  twitter: {
    title: "Wine Quality Predictor | Subham Sangwan",
    description: "The build, the benchmark and the limitations of my wine quality project.",
  },
};

export default function WineCaseStudy() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a1a]">
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
            <p className="font-mono text-xs uppercase text-[#6b6b6b]">Project notes / AI &amp; ML</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Wine Quality Predictor</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#4a4a4a]">
              I used this project to connect an ML model to a usable web app. A user enters
              wine measurements, the API checks them, and the model returns an estimated
              quality score. The harder part was working out what that score could actually tell us.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
              <a href="https://wine-quality-predictor-pi.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4">
                Open live project <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href={repository} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4">
                <Github size={16} aria-hidden="true" /> Source code
              </a>
            </div>
            <p className="mt-4 font-mono text-xs leading-relaxed text-[#6b6b6b]">React / FastAPI / Python / scikit-learn / Docker</p>
          </header>

          <figure>
            <Image src="/case-studies/wine-prediction.png" alt="VinoPredict prediction form showing wine type, acidity, pH, sugar, density and alcohol inputs" width={1024} height={642} sizes="(min-width: 1024px) 976px, 100vw" />
            <figcaption className="mt-3 text-sm text-[#6b6b6b]">The prediction form, from the project repository.</figcaption>
          </figure>

          <div className="mt-12 space-y-12 text-base leading-relaxed text-[#4a4a4a] [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#1a1a1a] [&_p+p]:mt-4 [&_a]:underline [&_a]:underline-offset-4">
            <section aria-labelledby="the-task">
              <h2 id="the-task">What I built</h2>
              <p>
                The app estimates a sensory quality rating from 11 chemical measurements and
                a red-or-white wine selection. I worked across the React form, FastAPI prediction
                endpoint and Python model pipeline, rather than leaving the model in a notebook.
              </p>
              <p>
                The data comes from Portuguese Vinho Verde samples. This is a learning project,
                not a replacement for tasting a wine or testing its safety. It does not know the
                brand, grape variety or price.
              </p>
            </section>

            <section aria-labelledby="request-flow">
              <h2 id="request-flow">From a reading to a result</h2>
              <ol className="list-decimal space-y-3 pl-6 marker:font-mono marker:text-[#1a1a1a]">
                <li>The React form collects the readings and flags invalid inputs.</li>
                <li>A JSON request goes to <code className="font-mono text-sm">POST /predict</code>. FastAPI checks the values again.</li>
                <li>The backend puts the inputs in the saved feature order, applies the saved scaler and runs the Random Forest model.</li>
                <li>The API returns a score, a quality label and model-wide feature importance. The interface displays the result or a specific error.</li>
              </ol>
              <p className="mt-4">
                The current training script uses 100 trees with a maximum depth of 10. Random
                Forest can model nonlinear relationships in tabular data by averaging tree
                predictions. It is a practical starting point here, not a claim that it is the best model.
              </p>
            </section>

            <section aria-labelledby="validation-work">
              <h2 id="validation-work">The details that mattered</h2>
              <p>
                A generic error was not enough when one reading prevented a prediction.
                The interface maps API validation errors back to the field and includes the
                entered value. For example, free sulfur dioxide cannot exceed total sulfur dioxide.
              </p>
              <p>
                A slow service and an invalid result are different problems. The request code
                handles timeouts, unavailable models and malformed responses separately.
                On startup, the backend also checks that the model, scaler and saved feature
                names agree before accepting them together.
              </p>
            </section>

            <section aria-labelledby="benchmark">
              <h2 id="benchmark">What the evaluation says</h2>
              <p className="border-l-4 border-[#ff5c00] pl-4 font-medium text-[#1a1a1a]">
                These are saved benchmark results, not measured performance of the live backend.
                The Extra Trees candidate has not replaced the production Random Forest model.
              </p>
              <p>
                The benchmark uses {evaluation.sample_count.toLocaleString("en-US")} rows:
                {" "}{evaluation.train_count.toLocaleString("en-US")} for training and
                {" "}{evaluation.test_count.toLocaleString("en-US")} for testing. Identical
                measurement rows stay in the same partition to avoid testing on copies of training
                examples. Three-fold grouped cross-validation selects the candidate using only the training partition.
              </p>
              <table className="mt-6 w-full table-fixed text-left text-sm">
                <caption className="pb-3 text-left font-medium">Held-out results from the saved benchmark</caption>
                <thead className="border-y border-[#e5e0d8] text-[#1a1a1a]">
                  <tr><th scope="col" className="w-1/2 py-3 pr-2">Model</th><th scope="col" className="py-3 pr-2">MAE</th><th scope="col" className="py-3">R²</th></tr>
                </thead>
                <tbody>
                  {evaluation.test_results.map(result => (
                    <tr key={result.name} className="border-b border-[#e5e0d8]">
                      <th scope="row" className="py-3 pr-2 font-normal">{result.name}</th>
                      <td className="py-3 pr-2 font-mono">{result.mae.toFixed(3)}</td>
                      <td className="py-3 font-mono">{result.r2.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4">
                Lower MAE means a smaller average error in rating points. It is not an accuracy
                percentage. Extra Trees improved the saved test MAE from 0.524 for the depth-10
                Random Forest reference to 0.503, but that alone is not a reason to swap the deployed model.
              </p>
            </section>

            <section aria-labelledby="limitations">
              <h2 id="limitations">Why so many predictions sit near the middle</h2>
              <p>
                This was a question that came up while checking the app: why did large changes
                to the readings still often produce an average-looking score?
                {" "}{((commonRatings / evaluation.sample_count) * 100).toFixed(1)}% of the dataset
                has a rating of 5 or 6. There are just {evaluation.rating_counts["9"]} examples rated 9.
                Combined with tree averaging, that makes predictions near the middle unsurprising.
                It does not prove that every prediction is right.
              </p>
              <p>
                The benchmark still underestimates rare high ratings. Changing every input to
                an extreme value also creates combinations the model may never have seen.
                A number inside a permitted range is not necessarily a familiar sample.
                Model-wide feature importance is not an explanation of one particular prediction either.
              </p>
            </section>

            <section aria-labelledby="checks-and-next">
              <h2 id="checks-and-next">Checks and what I would do next</h2>
              <p>
                The repository includes tests for invalid measurements, feature ordering,
                incompatible model artifacts, request failures and predictions on real red and
                white dataset samples. Evaluation tests also check that duplicate measurements
                do not cross the train/test split.
              </p>
              <p>
                Next, I would version the model artifacts alongside their evaluation report,
                check serving compatibility and compare errors across ratings before promoting
                a new model. I would not stretch the output just to make the score look more varied.
              </p>
            </section>

            <section aria-labelledby="references" className="border-t border-[#e5e0d8] pt-8 text-sm">
              <h2 id="references">Code and references</h2>
              <p>Code and report snapshot: <code className="font-mono">2c45b15</code>. The figures above come from the report stored with that revision.</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li><a href={`${source}/frontend/src/data/evaluation.json`}>Saved evaluation report</a> and <a href={`${source}/ml_pipeline/evaluate_model.py`}>evaluation script</a></li>
                <li><a href={`${source}/backend/app/model.py`}>Inference code</a> and <a href={`${source}/frontend/src/lib/prediction.js`}>request handling</a></li>
                <li><a href={`${source}/docs/model-evaluation.md`}>Evaluation scope and limitations</a></li>
                <li><a href="https://archive.ics.uci.edu/dataset/186/wine+quality">UCI Wine Quality dataset</a>, Cortez et al. (2009), CC BY 4.0</li>
                <li><a href="https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html">scikit-learn Random Forest documentation</a></li>
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
