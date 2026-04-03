import Image from "next/image";
import { ArrowRight, GitBranch } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HomePage() {
  const t = await getTranslations("landing");

  return (
    <main className="mx-auto flex w-full max-w-225 flex-col px-4 pb-24 pt-16 md:px-6">
      <section className="max-w-2xl">
        <a
          href="https://github.com/Pani-Kaz/git-workflow-assistant"
          target="_blank"
          rel="noreferrer"
          className="mb-6 flex items-center gap-2.5"
        >
          <Image
            src="/pani_cat_transparente.png"
            alt="PaniKaz"
            width={3508}
            height={2480}
            className="h-8 w-auto object-contain opacity-80"
          />
          <span className="font-mono text-xs text-base-500">
            git-workflow-assistant
          </span>
        </a>

        <h1 className="text-[2rem] font-semibold leading-tight tracking-tight text-base-800 md:text-[2.75rem]">
          {t("hero.title")}
        </h1>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-base-500">
          {t("hero.description")}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/generator"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 text-sm font-medium text-white transition-colors"
          >
            {t("hero.primaryCta")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <a
            href="https://github.com/Pani-Kaz/git-workflow-assistant"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-base-100/50 px-4 text-sm font-medium text-base-500 transition-colors hover:bg-base-100/80"
          >
            <GitBranch className="h-3.5 w-3.5" />
            {t("hero.secondaryCta")}
          </a>
        </div>

        <p className="mt-5 text-xs text-base-500">
          {t("hero.openSource")} · {t("hero.multiArtifact")}
        </p>
      </section>
      <section className="mt-12">
        <div className="overflow-hidden rounded-xl border border-base-800/10 bg-base-800/5">
          <div className="border-b border-base-800/10 px-5 py-3">
            <span className="font-mono text-xs text-base-500">
              # {t("hero.cardInputLabel").toLowerCase()}
            </span>
          </div>
          <div className="p-5">
            <pre className="font-mono text-xs leading-relaxed text-base-500 whitespace-pre-wrap">
              {t("hero.cardInputExample")}
            </pre>

            <div className="mt-5 space-y-4 border-t border-base-800/10 pt-5">
              <div>
                <span className="font-mono text-[11px] text-base-500">
                  commit
                </span>
                <p className="mt-1 font-mono text-xs text-emerald-400">
                  git commit -m &quot;feat(generator): add api key management
                  flow&quot;
                </p>
              </div>
              <div>
                <span className="font-mono text-[11px] text-base-500">
                  branch
                </span>
                <p className="mt-1 font-mono text-xs text-blue-400">
                  git checkout -b feat/generator-api-key-management
                </p>
              </div>
              <div>
                <span className="font-mono text-[11px] text-base-500">
                  pull request
                </span>
                <p className="mt-1 font-mono text-xs text-base-300">
                  feat(generator): add multilingual API key management flow
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-24 border-t border-base-100 pt-16">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold tracking-tight text-base-800">
            {t("origin.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-base-500">
            {t("origin.descriptionOne")}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-base-500">
            {t("origin.descriptionTwo")}
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {(["list", "standard", "rewrite"] as const).map((key) => (
            <div key={key}>
              <p className="text-sm font-medium text-base-800/80">
                {t(`pain.${key}Title`)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-base-500">
                {t(`pain.${key}Description`)}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-24 border-t border-base-100 pt-16">
        <h2 className="text-xl font-semibold tracking-tight text-base-800">
          {t("workflow.title")}
        </h2>

        <div className="mt-8 space-y-7">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex gap-5">
              <span className="mt-0.5 w-4 shrink-0 font-mono text-sm text-base-500">
                {step}.
              </span>
              <div>
                <p className="text-sm font-medium text-base-800/80">
                  {t(`workflow.steps.step${step}.title`)}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-base-500">
                  {t(`workflow.steps.step${step}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-24 border-t border-base-100 pt-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-xl font-semibold tracking-tight text-base-800">
              {t("opensource.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-base-500">
              {t("opensource.description")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-base-500">
              {t("opensource.securityDescription")}
            </p>
          </div>

          <a
            href="https://github.com/Pani-Kaz/git-workflow-assistant"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-base-100/50 px-4 text-sm font-medium text-base-500 transition-colors hover:bg-base-100/80"
          >
            <GitBranch className="h-3.5 w-3.5" />
            {t("opensource.repositoryCta")}
          </a>
        </div>
      </section>
      <section className="mt-24 border-t border-base-100 pt-16">
        <h2 className="max-w-lg text-xl font-semibold tracking-tight text-base-800">
          {t("cta.title")}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-base-500">
          {t("cta.description")}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/generator"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-800"
          >
            {t("cta.primary")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href="https://github.com/Pani-Kaz/git-workflow-assistant"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-base-100/50 px-4 text-sm font-medium text-base-500 transition-colors hover:bg-base-100/80"
          >
            <GitBranch className="h-3.5 w-3.5" />
            {t("cta.secondary")}
          </a>
        </div>
      </section>
    </main>
  );
}
