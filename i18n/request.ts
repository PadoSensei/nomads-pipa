import * as rootParams from "next/root-params";
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { Formats, hasLocale, IntlErrorCode } from "next-intl";
import { routing } from "./routing";

export const formats = {
  dateTime: {
    short: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
    long: {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
    timeOnly: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
    fullWithTime: {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
  },
  number: {
    currencyBRL: {
      style: "currency",
      currency: "BRL",
    },
    precise: {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    },
    percentage: {
      style: "percent",
      maximumFractionDigits: 1,
    },
  },
} satisfies Formats;

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      notFound();
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "America/Fortaleza",
    formats,
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`[next-intl] Missing translation: ${error.message}`);
        }
      } else {
        console.error(`[next-intl] Intl error:`, error);
      }
    },
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter(Boolean).join(".");
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return `[Missing translation: ${path}]`;
      }
      return path;
    },
  };
});
