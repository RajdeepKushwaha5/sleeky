"use client";

import { EyeIcon, EyeOffIcon, PhoneIcon } from "lucide-react";
import { useState } from "react";

import { useIsClient } from "@/hooks/use-is-client";
import { decodePhoneNumber, formatPhoneNumber } from "@/utils/string";

import { IntroItem } from "./intro-item";

export function PhoneItem({ phoneNumber }: { phoneNumber: string }) {
  const isClient = useIsClient();
  const phoneNumberDecoded = decodePhoneNumber(phoneNumber);
  const [isRevealed, setIsRevealed] = useState(false);

  // Mask the phone number (show only last 4 digits)
  const getMaskedNumber = () => {
    if (!phoneNumberDecoded) return "••••••••••";
    const cleaned = phoneNumberDecoded.replace(/\D/g, "");
    const lastFour = cleaned.slice(-4);
    return `+91 ••• ••• ${lastFour}`;
  };

  const handleReveal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRevealed(!isRevealed);
  };

  return (
    <div className="group relative">
      <IntroItem
        icon={PhoneIcon}
        content={
          isClient
            ? isRevealed
              ? formatPhoneNumber(phoneNumberDecoded)
              : getMaskedNumber()
            : "[Phone protected]"
        }
        href={isRevealed ? `tel:${phoneNumberDecoded}` : "#"}
      />

      {isClient && (
        <button
          onClick={handleReveal}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 transition-colors hover:bg-muted/50"
          aria-label={isRevealed ? "Hide phone number" : "Reveal phone number"}
        >
          {isRevealed ? (
            <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
          ) : (
            <EyeIcon className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      )}
    </div>
  );
}
