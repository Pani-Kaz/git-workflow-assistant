import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppNavbar } from "@/components/common/navbar/app-navbar";
import { ApiKeyDialogProvider } from "@/components/providers/api-key-dialog-provider";

const metadataByLocale = {
  en: {
    title: "Git Workflow Assistant",
    description:
      "Generate professional branch names, commit messages and pull request descriptions with a consistent Git workflow.",
  },
  pt: {
    title: "Git Workflow Assistant",
    description:
      "Gere nomes de branch, mensagens de commit e descrições de pull request com um fluxo Git profissional e consistente.",
  },
  es: {
    title: "Git Workflow Assistant",
    description:
      "Genera nombres de ramas, mensajes de commit y descripciones de pull request con un flujo Git profesional y consistente.",
  },
} as const;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  const current = metadataByLocale[currentLocale];

  return {
    title: current.title,
    description: current.description,
    alternates: {
      canonical: `/${currentLocale}`,
      languages: {
        en: "/en",
        pt: "/pt",
        es: "/es",
      },
    },
    openGraph: {
      title: current.title,
      description: current.description,
      url: `/${currentLocale}`,
      siteName: "Git Workflow Assistant",
      locale:
        currentLocale === "pt"
          ? "pt_BR"
          : currentLocale === "es"
            ? "es_ES"
            : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: current.title,
      description: current.description,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ApiKeyDialogProvider>
        <AppNavbar />
        {children}
      </ApiKeyDialogProvider>
    </NextIntlClientProvider>
  );
}