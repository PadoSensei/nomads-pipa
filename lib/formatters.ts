/**
 * Locale-Aware Formatting Utilities for Nomads Pipa
 *
 * Provides consistent formatting for dates, times, numbers, and currency (BRL)
 * adhering to locale conventions and local Pipa timezone (America/Fortaleza).
 */

import type { AppLocale } from "@/i18n/routing";

export const LOCAL_TIMEZONE = "America/Fortaleza";

/**
 * Format a numeric amount in Brazilian Real (BRL) according to locale.
 *
 * Examples:
 * - en: "R$50.00" or "R$ 50.00"
 * - pt-BR: "R$ 50,00"
 * - es: "R$ 50,00"
 */
export function formatCurrencyBRL(
  amount: number,
  locale: AppLocale = "en"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

/**
 * Format a number with optional maximum fraction digits.
 */
export function formatNumber(
  value: number,
  locale: AppLocale = "en",
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Format a date/time string or Date object in America/Fortaleza timezone.
 */
export function formatDateTime(
  date: string | Date,
  locale: AppLocale = "en",
  options: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
    timeStyle: "short",
  }
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    timeZone: LOCAL_TIMEZONE,
    ...options,
  }).format(d);
}

/**
 * Format a date only (short, medium, long) in America/Fortaleza timezone.
 */
export function formatDate(
  date: string | Date,
  locale: AppLocale = "en",
  style: "short" | "medium" | "long" | "full" = "medium"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    timeZone: LOCAL_TIMEZONE,
    dateStyle: style,
  }).format(d);
}

/**
 * Format a time only in America/Fortaleza timezone.
 */
export function formatTime(
  date: string | Date,
  locale: AppLocale = "en"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    timeZone: LOCAL_TIMEZONE,
    timeStyle: "short",
    hour12: false,
  }).format(d);
}
