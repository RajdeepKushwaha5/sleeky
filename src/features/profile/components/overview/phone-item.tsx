"use client";

import { PhoneIcon } from "lucide-react";

import { useIsClient } from "@/hooks/use-is-client";
import { decodePhoneNumber } from "@/utils/string";

import { IntroItem } from "./intro-item";

export function PhoneItem({ phoneNumber }: { phoneNumber: string }) {
  const isClient = useIsClient();
  const phoneNumberDecoded = decodePhoneNumber(phoneNumber);

  // Mask the phone number (show only last 4 digits)
  const getMaskedNumber = () => {
    if (!phoneNumberDecoded)
      return "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022";
    const cleaned = phoneNumberDecoded.replace(/\D/g, "");
    const lastFour = cleaned.slice(-4);
    return `+91 \u2022\u2022\u2022 \u2022\u2022\u2022 ${lastFour}`;
  };

  return (
    <IntroItem
      icon={PhoneIcon}
      content={isClient ? getMaskedNumber() : "[Phone protected]"}
      href={isClient ? `tel:${phoneNumberDecoded}` : "#"}
      copyValue={isClient ? phoneNumberDecoded : undefined}
    />
  );
}
