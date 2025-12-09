"use client";

import { MailIcon } from "lucide-react";

import { useIsClient } from "@/hooks/use-is-client";
import { decodeEmail } from "@/utils/string";

import { IntroItem } from "./intro-item";

export function EmailItem({ email }: { email: string }) {
  const isClient = useIsClient();
  const emailDecoded = decodeEmail(email);

  // Mask the email (show first 4 and last 2 chars of username before @)
  const getMaskedEmail = () => {
    if (!emailDecoded) return "••••••••@••••.•••";
    const [username, domain] = emailDecoded.split("@");
    if (!username || !domain) return emailDecoded;

    if (username.length <= 6) {
      // For short usernames, show first 2 and last 1 with dots in between
      const masked = username.slice(0, 2) + "•••" + username.slice(-1);
      return `${masked}@${domain}`;
    }
    // For longer usernames, show first 4 and last 2 with dots in between
    const masked = username.slice(0, 4) + "•••" + username.slice(-2);
    return `${masked}@${domain}`;
  };

  return (
    <IntroItem
      icon={MailIcon}
      content={isClient ? getMaskedEmail() : "[Email protected]"}
      href={isClient ? `mailto:${emailDecoded}` : "#"}
      copyValue={isClient ? emailDecoded : undefined}
    />
  );
}
