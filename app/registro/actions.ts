"use server";

import { redirect } from "next/navigation";

import { getSafeNextPath } from "@/lib/account/redirects";
import { createSupabaseAuthServerClient } from "@/lib/supabase/auth-server";
import type { Database } from "@/lib/supabase/types";

type AccountType =
  Database["public"]["Tables"]["profiles"]["Row"]["account_type"];

const validAccountTypes = new Set<AccountType>(["user", "organization"]);

function getString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function getAccountType(formData: FormData): AccountType {
  const value = getString(formData, "account_type");

  return validAccountTypes.has(value as AccountType)
    ? (value as AccountType)
    : "user";
}

export async function registerAccountAction(formData: FormData) {
  const displayName = getString(formData, "display_name");
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");
  const passwordConfirm = getString(formData, "password_confirm");
  const accountType = getAccountType(formData);
  const locality = getString(formData, "locality");
  const phone = getString(formData, "phone");
  const whatsappGroupOptIn = formData.get("whatsapp_group_opt_in") === "on";
  const adultConfirmed = formData.get("adult_confirmed") === "on";
  const privacyAccepted = formData.get("privacy_terms_accepted") === "on";
  const next = getSafeNextPath(formData.get("next"));
  const encodedNext = encodeURIComponent(next);

  if (!displayName || !email || !password || !locality || !phone) {
    redirect(`/registro?error=missing-fields&next=${encodedNext}`);
  }

  if (password.length < 8) {
    redirect(`/registro?error=weak-password&next=${encodedNext}`);
  }

  if (password !== passwordConfirm) {
    redirect(`/registro?error=password-mismatch&next=${encodedNext}`);
  }

  if (!adultConfirmed) {
    redirect(`/registro?error=adult-required&next=${encodedNext}`);
  }

  if (!privacyAccepted) {
    redirect(`/registro?error=privacy-required&next=${encodedNext}`);
  }

  const supabase = await createSupabaseAuthServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        account_type: accountType,
        adult_confirmed: true,
        display_name: displayName,
        full_name: displayName,
        locality,
        phone,
        privacy_terms_accepted: true,
        whatsapp_group_opt_in: whatsappGroupOptIn
      }
    }
  });

  if (error) {
    redirect(`/registro?error=signup-failed&next=${encodedNext}`);
  }

  if (!data.session) {
    redirect(`/ingresar?registered=1&next=${encodedNext}`);
  }

  redirect(next);
}
